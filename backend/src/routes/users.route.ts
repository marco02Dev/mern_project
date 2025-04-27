import { RequestHandler, Router } from "express";
import { getAllUsers, logUserIntoAccount } from "../controller/user.controller";
import { createUser } from "../controller/user.controller";
import { usersEndpointName } from "../config/env.config";
import { deleteUser } from "../controller/user.controller";
import { getUserById } from "../controller/user.controller";
import { checkAthorizedIp } from "../middlewares/authorize-ip.middleware";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";

const usersRouter: Router = Router();
const defaultEndpoint: string = `/${usersEndpointName}`;
const endpointWithId: string = `${defaultEndpoint}/:id`;

const signInEndpoint: string = `${defaultEndpoint}/signup`;
const loginEndpoint: string = `${defaultEndpoint}/login`;
const logOutEndpoint: string = `${defaultEndpoint}/logout`;

usersRouter.get(defaultEndpoint, isAuthenticated, isAdmin, checkAthorizedIp, getAllUsers);
usersRouter.get(endpointWithId, isAuthenticated, getUserById)
usersRouter.post(signInEndpoint, createUser);
usersRouter.post(loginEndpoint, logUserIntoAccount);
usersRouter.delete(endpointWithId, isAuthenticated, deleteUser as unknown as RequestHandler);

export default usersRouter;