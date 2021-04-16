"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.confirmEmail = exports.sendEmailActivation = exports.login = exports.register = void 0;
const email_service_1 = require("./utils/email.service");
const helper_1 = require("./utils/helper");
const user_1 = __importDefault(require("../../models/user"));
const UserService = __importStar(require("./user.service"));
const ErrorResponse_1 = __importDefault(require("../../utils/ErrorResponse"));
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const custom_config_1 = __importDefault(require("../../models/custom_config"));
/**
 *
 * @param data: IUser
 */
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.getByEmail(data.email);
    if (user) {
        throw ErrorResponse_1.default.unprocessableEntity("User just registered.");
    }
    data.code_activation = helper_1.getCodeRandom();
    const newUser = new user_1.default(data);
    yield newUser.save();
    const userConfig = new custom_config_1.default();
    userConfig.user_id = newUser.id;
    yield userConfig.save();
    return newUser;
});
exports.register = register;
/**
 *
 * @param credentials: email and password
 */
const login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.getByEmail(credentials.email);
    if (!user) {
        throw ErrorResponse_1.default.notFound("user not found");
    }
    if (!(yield user.compare(credentials.password))) {
        throw ErrorResponse_1.default.badRequest("password not matched");
    }
    if (!user.isVerifiedEmail()) {
        throw ErrorResponse_1.default.unauthorized("can't access: please, verify your email");
    }
    if (!user.isActive()) {
        throw ErrorResponse_1.default.unauthorized("can't access: user not active");
    }
    const data = { id: user.id, email: user.email };
    const accessToken = jsonwebtoken_1.default.sign(data, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expiresIn
    });
    return {
        accessToken,
        type: "Bearer",
    };
});
exports.login = login;
/**
 *
 * @param email: string
 */
const sendEmailActivation = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.getByEmail(email);
    if (!user) {
        throw ErrorResponse_1.default.notFound("user not found");
    }
    if (user.isVerifiedEmail()) {
        throw ErrorResponse_1.default.unprocessableEntity("email already validated");
    }
    yield email_service_1.sendEmailToActive(user.email, user.code_activation);
    return user;
});
exports.sendEmailActivation = sendEmailActivation;
/**
 *
 * @param email: string
 * @param code: string
 */
const confirmEmail = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.getByEmail(email);
    if (!user) {
        throw ErrorResponse_1.default.notFound("user not found");
    }
    if (user.code_activation !== code) {
        throw ErrorResponse_1.default.unprocessableEntity("code activation not match");
    }
    user.verify_email_at = moment_1.default().format("YYYY-MM-DD HH:mm:ss");
    // user.code_activation = null;
    yield user.save();
    return true;
});
exports.confirmEmail = confirmEmail;
const me = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        include: {
            attributes: ["id", "factor_authorization"],
            model: custom_config_1.default
        },
        attributes: ["id", "email", "first_name", "last_name", "createdAt"],
        where: { id }
    });
    if (!user) {
        throw ErrorResponse_1.default.notFound("user not found");
    }
    return user;
});
exports.me = me;
//# sourceMappingURL=auth.service.js.map