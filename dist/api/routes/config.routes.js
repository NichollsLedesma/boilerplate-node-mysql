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
const express_1 = require("express");
const ResponseConstants_1 = require("../../utils/ResponseConstants");
const custom_config_1 = __importDefault(require("../../models/custom_config"));
exports.default = (app) => {
    const route = express_1.Router();
    app.use("/config", route);
    route.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const config = yield custom_config_1.default.findOne({ where: { user_id: req.user.id } });
            if (!config) {
                // TODO: create new config
            }
            return res
                .status(ResponseConstants_1.HTTP_CREATED)
                .json(ResponseConstants_1.buildDataResponse(" test ", user));
        }
        catch (e) {
            next(e);
        }
    }));
};
//# sourceMappingURL=config.routes.js.map