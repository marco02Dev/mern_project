import { Router } from "express";
import { checkUserSession } from "../controller/session.controller";
import { isAuthenticated } from "../middlewares/security/is-authenticated.middleware";
import { sessionEndpointName } from "../config/system/endpoints.config";

/**
 * Route to check and restore user session.
 * 
 * Protected endpoint:
 * - GET /session
 *   - Requires user to be authenticated.
 *   - Used primarily to restore the Redux store on the frontend by verifying active session.
*/

const sessionRouter = Router();

sessionRouter.get(
    //User
    `/${sessionEndpointName}`, 
    isAuthenticated, 
    checkUserSession
);

export default sessionRouter;
