import { RequestHandler, Router } from "express";
import { getAllUsers, logUserIntoAccount } from "../controller/user.controller";
import { createUser } from "../controller/user.controller";
import { usersEndpointName } from "../config/system/endpoints.config";
import { deleteUser } from "../controller/user.controller";
import { getUserById } from "../controller/user.controller";
import { checkAthorizedIp } from "../middlewares/authorize-ip.middleware";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";
import { logUserOut } from "../controller/user.controller";
import { blockRoleField } from "../middlewares/block-role-field";

const usersRouter: Router = Router();
const defaultEndpoint: string = `/${usersEndpointName}`;
const endpointWithId: string = `${defaultEndpoint}/:id`;

const signInEndpoint: string = `${defaultEndpoint}/signup`;
const loginEndpoint: string = `${defaultEndpoint}/login`;
const logOutEndpoint: string = `${defaultEndpoint}/logout`;

usersRouter.get(defaultEndpoint, isAuthenticated, isAdmin, checkAthorizedIp, getAllUsers);
usersRouter.get(endpointWithId, isAuthenticated, getUserById)
usersRouter.post(signInEndpoint,  blockRoleField, createUser);
usersRouter.post(loginEndpoint, logUserIntoAccount);
usersRouter.delete(endpointWithId, isAuthenticated, isAdmin, checkAthorizedIp, deleteUser as unknown as RequestHandler);
usersRouter.post(logOutEndpoint, isAuthenticated, logUserOut);

export default usersRouter;