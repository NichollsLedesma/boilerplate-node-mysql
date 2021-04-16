import {Sequelize} from "sequelize";
import config from "./";

const {host, name, user, password} = config.database;

export const sequelize = new Sequelize(name, user, password, {
    host,
    dialect:"mysql",
});
