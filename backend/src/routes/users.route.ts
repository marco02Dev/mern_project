import { RequestHandler, Router } from "express";
import { getAllUsers, logUserIntoAccount } from "../controller/user.controller";
import { createUser } from "../controller/user.controller";
import { usersEndpointName } from "../config/system/endpoints.config";
import { deleteUser } from "../controller/user.controller";
import { getUserById } from "../controller/user.controller";
import { checkAthorizedIp } from "../middlewares/security/authorize-ip.middleware";
import { isAdmin } from "../middlewares/security/is-admin.middleware";
import { isAuthenticated } from "../middlewares/security/is-authenticated.middleware";
import { logUserOut } from "../controller/user.controller";
import { blockRoleField } from "../middlewares/security/block-role-field";
import { rejectRequestIfHoneyPotIsFilled } from "../middlewares/security/reject-request-if-honey-pot-is-filled.middleware";

const usersRouter: Router = Router();
const defaultEndpoint: string = `/${usersEndpointName}`;
const endpointWithId: string = `${defaultEndpoint}/:id`;

const signInEndpoint: string = `${defaultEndpoint}/signup`;
const loginEndpoint: string = `${defaultEndpoint}/login`;
const logOutEndpoint: string = `${defaultEndpoint}/logout`;

usersRouter.get(defaultEndpoint, isAuthenticated, isAdmin, checkAthorizedIp, getAllUsers);
usersRouter.get(endpointWithId, isAuthenticated, getUserById)
usersRouter.post(signInEndpoint, rejectRequestIfHoneyPotIsFilled, blockRoleField, createUser);
usersRouter.post(loginEndpoint, rejectRequestIfHoneyPotIsFilled, logUserIntoAccount);
usersRouter.delete(endpointWithId, isAuthenticated, isAdmin, checkAthorizedIp, deleteUser as unknown as RequestHandler);
usersRouter.post(logOutEndpoint, isAuthenticated, logUserOut);

export default usersRouter;