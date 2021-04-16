"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const ResponseConstants_1 = require("./ResponseConstants");
class ErrorResponse {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
exports.default = ErrorResponse;
// ERROR RESPONSES
ErrorResponse.badRequest = (message) => {
    logger_1.default.error(message);
    return new ErrorResponse(ResponseConstants_1.HTTP_BAD_REQUEST, message);
};
ErrorResponse.unauthorized = (message) => {
    logger_1.default.error(message);
    return new ErrorResponse(ResponseConstants_1.HTTP_UNAUTHORIZED, message);
};
ErrorResponse.forbidden = (message) => {
    logger_1.default.error(message);
    return new ErrorResponse(ResponseConstants_1.HTTP_FORBIDDEN, message);
};
ErrorResponse.notFound = (message) => {
    logger_1.default.error(message);
    return new ErrorResponse(ResponseConstants_1.HTTP_NOT_FOUND, message);
};
ErrorResponse.unprocessableEntity = (message) => {
    logger_1.default.error(message);
    return new ErrorResponse(ResponseConstants_1.HTTP_UNPROCESSABLE_ENTITY, message);
};
ErrorResponse.internalError = (message) => {
    logger_1.default.error(message);
    return new ErrorResponse(ResponseConstants_1.HTTP_INTERNAL_SERVER_ERROR, message);
};
//# sourceMappingURL=ErrorResponse.js.map