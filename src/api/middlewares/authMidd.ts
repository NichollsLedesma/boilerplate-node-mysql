import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../../utils/ErrorResponse";
import {getById} from "../services/user.service";
import config from "../../config";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
        const err = ErrorResponse.forbidden("access token is required");
        next(err);
    }

    try {
        const data: any = jwt.verify(accessToken!, config.jwt.secret);
        const {id} = data
        const user = await getById(id);

        if (!user) {
            const err = ErrorResponse.notFound("user not found")
            next(err);
        }

        req.user = {
            id: user!.id,
            email: user!.email
        }

        next();
    } catch (e) {
        const err = ErrorResponse.unprocessableEntity("unprocessable: " + e.message);
        next(err);
    }
}
