"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const user_1 = __importDefault(require("./user"));
class Custom_config extends sequelize_1.Model {
}
Custom_config.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id'
        }
    },
    code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
    },
    factor_authorization: {
        type: sequelize_1.DataTypes.ENUM('email', 'phone'),
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "custom_config",
    modelName: "custom_config",
});
exports.default = Custom_config;
//# sourceMappingURL=custom_config.js.map