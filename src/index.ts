import config from "./config";
import app from "./app"
import {sequelize} from "./config/database";

app.listen(config.api.port, () => {
    console.log(`running port ${config.api.port}`);

    // sequelize.sync({force: true}) // alter
    sequelize.authenticate()
        .then(_ => console.log('Connection has been established successfully.'))
        .catch(err => console.error('Unable to connect to the database:', err));
});
