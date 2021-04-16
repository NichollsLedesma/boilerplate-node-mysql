"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDataResponse = exports.HTTP_INTERNAL_SERVER_ERROR = exports.HTTP_UNPROCESSABLE_ENTITY = exports.HTTP_NOT_FOUND = exports.HTTP_FORBIDDEN = exports.HTTP_UNAUTHORIZED = exports.HTTP_BAD_REQUEST = exports.HTTP_CREATED = exports.HTTP_OK = void 0;
exports.HTTP_OK = 200;
exports.HTTP_CREATED = 201;
exports.HTTP_BAD_REQUEST = 400;
exports.HTTP_UNAUTHORIZED = 401;
exports.HTTP_FORBIDDEN = 403;
exports.HTTP_NOT_FOUND = 404;
exports.HTTP_UNPROCESSABLE_ENTITY = 422;
exports.HTTP_INTERNAL_SERVER_ERROR = 500;
const buildDataResponse = (message, data) => {
    return {
        message,
        data
    };
};
exports.buildDataResponse = buildDataResponse;
//# sourceMappingURL=ResponseConstants.js.map