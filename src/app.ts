import express, {Application, NextFunction, Request, Response} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import config from "./config";
import routes from "./api/routes";
import ErrorResponse from "./utils/ErrorResponse";
import {HTTP_INTERNAL_SERVER_ERROR} from "./utils/ResponseConstants";

const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(config.api.prefix, routes());

app.use((req: Request, res: Response, next: NextFunction) => {
    const err = ErrorResponse.notFound("page not found");
    next(err)
})

app.use((err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || HTTP_INTERNAL_SERVER_ERROR).json({
        message: err.message
    })
})

export default app;
