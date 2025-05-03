import { Router } from "express";
import { checkUserSession } from "../controller/session.controller";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { sessionEndpointName } from "../config/system/endpoints.config";

const sessionRouter = Router();

sessionRouter.get(sessionEndpointName, isAuthenticated, checkUserSession);

export default sessionRouter;
