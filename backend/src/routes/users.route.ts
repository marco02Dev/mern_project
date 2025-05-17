import { RequestHandler, Router } from "express";
import { usersEndpointName } from "../config/system/endpoints.config";
import { checkAuthorizedIp } from "../middlewares/security/check-authorize-ip.middleware";
import { isAdmin } from "../middlewares/security/is-admin.middleware";
import { getAllUsersController } from "../controller/user/get-all-users.controller";
import { createUserController } from "../controller/user/create-user.controller";
import { isAuthenticated } from "../middlewares/security/is-authenticated.middleware";
import { logUserOutController } from "../controller/user/log-user-out.controller";
import { logUserInController } from "../controller/user/log-user-in.controller";
import { getUserByIdController } from "../controller/user/get-user-by-id.controller";
import { deleteUserController } from "../controller/user/delete-user.controller";
import { blockRoleField } from "../middlewares/security/block-role-field";
import { rejectRequestIfHoneyPotIsFilled } from "../middlewares/security/reject-request-if-honey-pot-is-filled.middleware";
import { isProduction } from "../config/system/env.config";

/**
 * **Users Router**
 *
 * This router handles all operations related to user authentication and administration.
 * It includes public routes (login/signup), authenticated routes (get user info, logout),
 * and admin-only routes (get all users, delete user).
 *
 * **IMPORTANT**:  
 * All endpoint paths are **defined dynamically** using values from the configuration file:  
 * `config/system/endpoints.config.ts`  
 * Specifically, this uses the `usersEndpointName` value to form all routes.
 * This approach ensures centralized route naming and easier updates.
 *
 * Defined Endpoints:
 * - POST   /[usersEndpointName]/signup     → Create a new user account  
 * - POST   /[usersEndpointName]/login      → Log in a user  
 * - POST   /[usersEndpointName]/logout     → Log out the currently authenticated user  
 * - GET    /[usersEndpointName]/:id        → Retrieve user data by ID (requires authentication)  
 * - DELETE /[usersEndpointName]/:id        → Delete a user (admin-only, restricted to development)  
 * - GET    /[usersEndpointName]            → Get all users (admin-only, only in development)
 *
 * Middleware protection:
 * - Honeypot check for bot protection
 * - Role field block during signup
 * - Authentication and admin checks for protected routes
 * - IP-based restriction for sensitive admin routes
 *
 * @module usersRouter
*/

const usersRouter: Router = Router();
const defaultEndpoint: string = `/${usersEndpointName}`;
const endpointWithId: string = `${defaultEndpoint}/:id`;

const signInEndpoint: string = `${defaultEndpoint}/signup`;
const loginEndpoint: string = `${defaultEndpoint}/login`;
const logOutEndpoint: string = `${defaultEndpoint}/logout`;
const sessionEndpoint: string = `${defaultEndpoint}/session`;

if(!isProduction) {
    usersRouter.get(
        //Admin (Testing only)
        defaultEndpoint, 
        isAuthenticated, 
        isAdmin, 
        checkAuthorizedIp, 
        getAllUsersController
    );
}

usersRouter.post(
    //Public (Form)
    signInEndpoint, 
    rejectRequestIfHoneyPotIsFilled, 
    blockRoleField, 
    createUserController
);

usersRouter.post(
    //Public (Form)
    loginEndpoint, 
    rejectRequestIfHoneyPotIsFilled, 
    logUserInController
);

usersRouter.get(
    //User
    endpointWithId, 
    isAuthenticated, 
    getUserByIdController
);

usersRouter.post(
    //User
    logOutEndpoint, 
    isAuthenticated, 
    logUserOutController
);

usersRouter.delete(
    //Admin (Not yet implemented)
    endpointWithId, 
    isAuthenticated, 
    isAdmin, 
    checkAuthorizedIp, 
    deleteUserController as unknown as RequestHandler
);


export default usersRouter;