import {sendEmailLogin, sendEmailToActive, sendSmsLogin} from "./utils/aws.service";
import {getCodeRandom} from "./utils/helper";
import User, {IUser} from "../../models/user";
import * as UserService from "./user.service";
import ErrorResponse from "../../utils/ErrorResponse";
import moment from "moment";
import jwt from "jsonwebtoken";

import config from "../../config";
import Custom_config, {FACTOR_AUTH_EMAIL, FACTOR_AUTH_PHONE} from "../../models/custom_config";
import {getUserConfig} from "./custom_config.service";

/**
 *
 * @param data: IUser
 */
export const register = async (data: IUser) => {
    const user = await UserService.getByEmail(data.email)

    if (user) {
        throw ErrorResponse.unprocessableEntity("User just registered.")
    }

    data.code_activation = getCodeRandom();
    const newUser = new User(data);
    await newUser.save();

    return newUser;
}
/**
 *
 * @param credentials: email and password
 */
export const login = async (credentials: {
    email: string,
    password: string,
    code: string
}) => {
    const user = await UserService.getByEmail(credentials.email)

    if (!user) {
        throw ErrorResponse.notFound("user not found")
    }

    if (!await user.compare(credentials.password)) {
        throw  ErrorResponse.badRequest("password not matched")
    }

    if (!user.isVerifiedEmail()) {
        throw  ErrorResponse.unauthorized("can't access: please, verify your email")
    }

    if (!user.isActive()) {
        throw  ErrorResponse.unauthorized("can't access: user not active")
    }

    const userConfig = await getUserConfig(user.id);

    if (!userConfig || !userConfig.factor_authorization) {
        return buildToken(user);
    }

    if (!userConfig.code) {
        userConfig.code = getCodeRandom(5);
        await userConfig.save();

        switch (userConfig.factor_authorization) {
            case FACTOR_AUTH_EMAIL:
                await sendEmailLogin(user.email, userConfig.code);
                break;
            case FACTOR_AUTH_PHONE:
                if (!user.phone_number) {
                    throw  ErrorResponse.unprocessableEntity("factor authorization required phone number");
                }

                await sendSmsLogin(user.phone_number, userConfig.code);
                break;
            default:
                throw  ErrorResponse.notFound("factor authorization not found");
        }

        return `code sent on ${userConfig.factor_authorization}`;
    } else {
        const {code} = credentials
        const codeConfig = userConfig.code;
        userConfig.code = null;
        await userConfig.save();

        if (!code) {
            throw  ErrorResponse.badRequest("code is required");
        }

        if (code !== codeConfig) {
            throw  ErrorResponse.badRequest("code not match.");
        }


        return buildToken(user);
    }
}

export const buildToken = (user: IUser) => {
    const data = {id: user.id, email: user.email};
    const accessToken = jwt.sign(
        data,
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn
        }
    );

    return {
        accessToken,
        type: "Bearer",
    };
}

/**
 *
 * @param email: string
 */
export const sendEmailActivation = async (email: string) => {
    const user = await UserService.getByEmail(email)

    if (!user) {
        throw ErrorResponse.notFound("user not found")
    }

    if (user.isVerifiedEmail()) {
        throw ErrorResponse.unprocessableEntity("email already validated")
    }

    await sendEmailToActive(user.email, user.code_activation)

    return user;
}

/**
 *
 * @param email: string
 * @param code: string
 */
export const confirmEmail = async (email: string, code: string) => {
    const user = await UserService.getByEmail(email)

    if (!user) {
        throw ErrorResponse.notFound("user not found");
    }

    if (user.code_activation !== code) {
        throw ErrorResponse.unprocessableEntity("code activation not match");
    }

    user.verify_email_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // user.code_activation = null;
    await user.save();

    return true;
}

export const me = async (id: number): Promise<User> => {
    const user = await User.findOne({
        include: {
            attributes: ["id", "factor_authorization"],
            model: Custom_config
        },
        attributes: ["id", "email", "first_name", "last_name", "verify_email_at", "phone_number", "is_active", "createdAt"],
        where: {id}
    });

    if (!user) {
        throw ErrorResponse.notFound("user not found");
    }

    return user
}