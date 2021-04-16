"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const config_routes_1 = __importDefault(require("./config.routes"));
const authMidd_1 = require("../middlewares/authMidd");
exports.default = () => {
    const route = express_1.Router();
    auth_routes_1.default(route);
    route.use(authMidd_1.authMiddleware);
    user_routes_1.default(route);
    config_routes_1.default(route);
    return route;
};
//# sourceMappingURL=index.js.map