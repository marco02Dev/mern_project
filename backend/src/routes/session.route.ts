import { Router } from "express";
import { checkUserSessionController } from "../controller/session/check-user-session.controller";
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

const sessionRouter: Router = Router();

sessionRouter.get(
    //User
    `/${sessionEndpointName}`, 
    isAuthenticated, 
    checkUserSessionController
);

export default sessionRouter;
