import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database";
import {compare, hash} from "bcryptjs";
import Custom_config from "./custom_config";
import {Col} from "sequelize/types/lib/utils";

export interface IUser {
    id: number
    email: string
    password: string
    first_name: string
    last_name: string
    phone_number:string
    code_activation: string
    verify_email_at: string
    is_active: boolean
}


class User extends Model implements IUser {
    code_activation!: string;
    email!: string;
    first_name!: string;
    id!: number;
    last_name!: string;
    password!: string;
    verify_email_at!: string;
    is_active!: boolean;
    phone_number!: string;

    compare = async (password: string): Promise<boolean> => {
        return await compare(password, this.password)
    }

    toJSON(): object {
        const values = Object.assign({}, this.get());
        delete values.password;
        delete values.code_activation;

        return values;
    }

    isVerifiedEmail = (): boolean => {
        return this.verify_email_at !== null
    }
    isActive = (): boolean => {
        return this.is_active
    }

}

User.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    code_activation: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    verify_email_at: DataTypes.DATE,
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize,
    tableName: "user",
    modelName: "user",
})

User.beforeCreate((user, options) => {
    return hash(user.password, 10).then(hash => {
        user.password = hash
    }).catch(err => {
        console.log(err)
    })
})

User.hasOne(Custom_config, {
    foreignKey: "user_id", sourceKey: "id"
})

export default User