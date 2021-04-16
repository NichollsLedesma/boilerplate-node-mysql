"use strict";
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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorResponse_1 = __importDefault(require("../../utils/ErrorResponse"));
const user_service_1 = require("../services/user.service");
const config_1 = __importDefault(require("../../config"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!accessToken) {
        const err = ErrorResponse_1.default.forbidden("access token is required");
        next(err);
    }
    try {
        const data = jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt.secret);
        const { id } = data;
        const user = yield user_service_1.getById(id);
        if (!user) {
            const err = ErrorResponse_1.default.notFound("user not found");
            next(err);
        }
        req.user = {
            id: user.id,
            email: user.email
        };
        next();
    }
    catch (e) {
        const err = ErrorResponse_1.default.unprocessableEntity("unprocessable: " + e.message);
        next(err);
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMidd.js.map