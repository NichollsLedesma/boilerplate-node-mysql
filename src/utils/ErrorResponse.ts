import logger from "./logger";
import {
    HTTP_BAD_REQUEST,
    HTTP_FORBIDDEN, HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_UNAUTHORIZED,
    HTTP_UNPROCESSABLE_ENTITY
} from "./ResponseConstants";

export default class ErrorResponse {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    // ERROR RESPONSES
    static badRequest = (message: string) => {
        logger.error(message);

        return new ErrorResponse(HTTP_BAD_REQUEST, message);
    };

    static unauthorized = (message: string) => {
        logger.error(message);

        return new ErrorResponse(HTTP_UNAUTHORIZED, message);
    };

    static forbidden = (message: string) => {
        logger.error(message);

        return new ErrorResponse(HTTP_FORBIDDEN, message);
    };

    static notFound = (message: string): ErrorResponse => {
        logger.error(message);

        return new ErrorResponse(HTTP_NOT_FOUND, message);
    }

    static unprocessableEntity = (message: string): ErrorResponse => {
        logger.error(message);

        return new ErrorResponse(HTTP_UNPROCESSABLE_ENTITY, message);
    }

    static internalError = (message: string) => {
        logger.error(message);

        return new ErrorResponse(HTTP_INTERNAL_SERVER_ERROR, message);
    };
}
