"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
app_1.default.listen(config_1.default.api.port, () => {
    console.log(`running port ${config_1.default.api.port}`);
    // sequelize.sync({force: true}) // alter
    database_1.sequelize.authenticate()
        .then(_ => console.log('Connection has been established successfully.'))
        .catch(err => console.error('Unable to connect to the database:', err));
});
//# sourceMappingURL=index.js.map