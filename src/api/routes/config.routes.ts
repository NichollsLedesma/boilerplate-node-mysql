import {Router} from "express";
import {buildDataResponse, HTTP_OK} from "../../utils/ResponseConstants";
import * as ConfigService from "../services/custom_config.service";


export default (app: Router) => {
    const route = Router()
    app.use("/config", route)

    route.put("/", async (req, res, next) => {
        try {
            const config = await ConfigService.updateConfig(req.user.id, req.body);

            return res
                .status(HTTP_OK)
                .json(buildDataResponse("Config updated.", config));
        } catch (e) {
            next(e)
        }
    })

}