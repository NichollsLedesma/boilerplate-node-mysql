import {Router} from "express";
import {confirmEmail, login, register, sendEmailActivation, me} from "../services/auth.service";
import {buildDataResponse, HTTP_CREATED, HTTP_OK} from "../../utils/ResponseConstants";
import {authMiddleware} from "../middlewares/authMidd";

export default (app: Router) => {
    const route = Router()
    app.use("/auth", route)

    route.post("/register", async (req, res, next) => {
        try {
            const user = await register(req.body)

            return res
                .status(HTTP_CREATED)
                .json(buildDataResponse("user registered", user));
        } catch (e) {
            next(e)
        }
    })

    route.get("/confirm-activation-email", async (req, res, next) => {
        try {
            const {email, code} = req.query
            // @ts-ignore
            await confirmEmail(email, code)

            return res
                .status(HTTP_OK)
                .json(buildDataResponse("user activated", null));
        } catch (e) {
            next(e)
        }
    })

    route.post("/send-activation-email/:email", async (req, res, next) => {
        try {
            await sendEmailActivation(req.params.email)

            return res
                .status(HTTP_CREATED)
                .json(buildDataResponse("email sent", null));
        } catch (e) {
            next(e)
        }
    })

    route.post("/login",
        async (req, res, next) => {
        try {
            const user = await login(req.body)

            return res.status(HTTP_OK).json(buildDataResponse("user access", user))
        } catch (e) {
            next(e)
        }
    })

    route.get(
        "/me",
        authMiddleware,
        async (req, res, next) => {
        try {
            const user = await me(req.user.id)

            return res.status(HTTP_OK).json(buildDataResponse("user info", user))
        } catch (e) {
            next(e)
        }
    })
}