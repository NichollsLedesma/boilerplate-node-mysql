"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./api/routes"));
const ErrorResponse_1 = __importDefault(require("./utils/ErrorResponse"));
const ResponseConstants_1 = require("./utils/ResponseConstants");
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(config_1.default.api.prefix, routes_1.default());
app.use((req, res, next) => {
    const err = ErrorResponse_1.default.notFound("page not found");
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.code || ResponseConstants_1.HTTP_INTERNAL_SERVER_ERROR).json({
        message: err.message
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map