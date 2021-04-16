import {Router} from "express";
import auth from "./auth.routes";
import user from "./user.routes";
import config from "./config.routes";
import {authMiddleware} from "../middlewares/authMidd"

export default () => {
    const route = Router();
    auth(route);
    route.use(authMiddleware)
    user(route);
    config(route);

    return route;
};
