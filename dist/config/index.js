"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (!envFound) {
    throw new Error("missing .env file");
}
const config = {
    api: {
        port: process.env.PORT || 3000,
        prefix: "/api/v1",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "",
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    },
    database: {
        host: process.env.DB_HOST || "",
        name: process.env.DB_NAME || "",
        port: process.env.DB_PORT || "",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
    },
    aws: {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        },
        templates: {
            register: "template_register_user",
            login: "template_login_code",
        },
        sender: process.env.AWS_EMAIL_SENDER
    },
};
exports.default = config;
//# sourceMappingURL=index.js.map