import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database";
import User from "./user";

export interface IConfig {
    id: number
    user_id: number
    code: string
    factor_authorization: string
}

export const FACTOR_AUTH_EMAIL = "email";
export const FACTOR_AUTH_PHONE = "phone";


class Custom_config extends Model implements IConfig{
    // @ts-ignore
    code?: string | null;
    // @ts-ignore
    factor_authorization?: string | null;
    id!: number;
    user_id!: number;
}

Custom_config.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null,
    },
    factor_authorization: {
        type: DataTypes.ENUM(FACTOR_AUTH_EMAIL, FACTOR_AUTH_PHONE),
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize,
    tableName: "custom_config",
    modelName: "custom_config",
})

export default Custom_config