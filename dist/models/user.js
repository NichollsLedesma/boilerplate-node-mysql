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
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const bcryptjs_1 = require("bcryptjs");
const custom_config_1 = __importDefault(require("./custom_config"));
class User extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.compare = (password) => __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.compare(password, this.password);
        });
        this.isVerifiedEmail = () => {
            return this.verify_email_at !== null;
        };
        this.isActive = () => {
            return this.is_active;
        };
    }
    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.password;
        delete values.code_activation;
        return values;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    code_activation: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    verify_email_at: sequelize_1.DataTypes.DATE,
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "user",
    modelName: "user",
});
User.beforeCreate((user, options) => {
    return bcryptjs_1.hash(user.password, 10).then(hash => {
        user.password = hash;
    }).catch(err => {
        console.log(err);
    });
});
User.hasOne(custom_config_1.default, {
    foreignKey: "user_id", sourceKey: "id"
});
exports.default = User;
//# sourceMappingURL=user.js.map