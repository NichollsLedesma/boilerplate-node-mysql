"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("./"));
const { host, name, user, password } = _1.default.database;
exports.sequelize = new sequelize_1.Sequelize(name, user, password, {
    host,
    dialect: "mysql",
});
//# sourceMappingURL=database.js.map