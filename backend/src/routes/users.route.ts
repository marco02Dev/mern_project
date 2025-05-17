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
 * Users Router
 *
 * This router handles user-related operations including:
 * - Public routes for signing up and logging in
 * - Authenticated routes for retrieving user data and logging out
 * - Admin routes for managing users (limited to non-production)
 *
 * Endpoints:
 * - POST /users/signup          → Create a new user account (honeypot + role block)
 * - POST /users/login           → Log in a user (honeypot check)
 * - POST /users/logout          → Log out the currently authenticated user
 * - GET  /users/:id             → Get a user's data by ID (authenticated)
 * - DELETE /users/:id          → Admin-only user deletion (not implemented yet)
 * - GET /users                  → Admin-only list of all users (only in development)
*/

const usersRouter: Router = Router();
const defaultEndpoint: string = `/${usersEndpointName}`;
const endpointWithId: string = `${defaultEndpoint}/:id`;

const signInEndpoint: string = `${defaultEndpoint}/signup`;
const loginEndpoint: string = `${defaultEndpoint}/login`;
const logOutEndpoint: string = `${defaultEndpoint}/logout`;

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