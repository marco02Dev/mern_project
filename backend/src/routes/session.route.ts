import { Router } from "express";
import { checkUserSession } from "../controller/session.controller";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";

const sessionRouter = Router();

sessionRouter.get("/session", isAuthenticated, checkUserSession);

export default sessionRouter;
