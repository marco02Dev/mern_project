import { Router } from "express";
import { getAllUsers, logUserIntoAccount } from "../controller/user.controller";
import { createUser } from "../controller/user.controller";
import { usersEndpointName } from "../config/env";
import { deleteUser } from "../controller/user.controller";
import { getUserById } from "../controller/user.controller";

const usersRouter: Router = Router();
const defaultEndpoint: string = `/${usersEndpointName}`;
const endpointWithId: string = `${defaultEndpoint}/:id`;

const signInEndpoint: string = `${defaultEndpoint}/signup`;
const loginEndpoint: string = `${defaultEndpoint}/login`;
const logOutEndpoint: string = `${defaultEndpoint}/logout`;

usersRouter.get(defaultEndpoint, getAllUsers);
usersRouter.get(endpointWithId, getUserById)
usersRouter.post(signInEndpoint, createUser);
usersRouter.post(loginEndpoint, logUserIntoAccount);
usersRouter.delete(endpointWithId, deleteUser);

export default usersRouter;