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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const ResponseConstants_1 = require("../../utils/ResponseConstants");
const authMidd_1 = require("../middlewares/authMidd");
exports.default = (app) => {
    const route = express_1.Router();
    app.use("/auth", route);
    route.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield auth_service_1.register(req.body);
            return res
                .status(ResponseConstants_1.HTTP_CREATED)
                .json(ResponseConstants_1.buildDataResponse("user registered", user));
        }
        catch (e) {
            next(e);
        }
    }));
    route.get("/confirm-activation-email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, code } = req.query;
            // @ts-ignore
            yield auth_service_1.confirmEmail(email, code);
            return res
                .status(ResponseConstants_1.HTTP_OK)
                .json(ResponseConstants_1.buildDataResponse("user activated", null));
        }
        catch (e) {
            next(e);
        }
    }));
    route.post("/send-activation-email/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield auth_service_1.sendEmailActivation(req.params.email);
            return res
                .status(ResponseConstants_1.HTTP_CREATED)
                .json(ResponseConstants_1.buildDataResponse("email sent", null));
        }
        catch (e) {
            next(e);
        }
    }));
    route.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield auth_service_1.login(req.body);
            return res.status(ResponseConstants_1.HTTP_OK).json(ResponseConstants_1.buildDataResponse("user access", user));
        }
        catch (e) {
            next(e);
        }
    }));
    route.get("/me", authMidd_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield auth_service_1.me(req.user.id);
            return res.status(ResponseConstants_1.HTTP_OK).json(ResponseConstants_1.buildDataResponse("user info", user));
        }
        catch (e) {
            next(e);
        }
    }));
};
//# sourceMappingURL=auth.routes.js.map