import {Router} from "express";
import {buildDataResponse, HTTP_CREATED, HTTP_OK} from "../../utils/ResponseConstants";
import {updateUserData} from "../services/user.service";

export default (app: Router) => {
    const route = Router()
    app.use("/users", route)

    route.put("/", async (req, res, next) => {
        try {
            const user = await updateUserData(req.user.id, req.body);

            return res
                .status(HTTP_OK)
                .json(buildDataResponse("user data updated", user));
        } catch (e) {
            next(e)
        }
    })
}