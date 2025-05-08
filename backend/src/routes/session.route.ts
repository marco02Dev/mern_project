import { Router } from "express";
import { checkUserSession } from "../controller/session.controller";
import { isAuthenticated } from "../middlewares/security/is-authenticated.middleware";
import { sessionEndpointName } from "../config/system/endpoints.config";

const sessionRouter = Router();

sessionRouter.get(
    //User
    `/${sessionEndpointName}`, 
    isAuthenticated, 
    checkUserSession
);

export default sessionRouter;
