import { Router } from "express";
import { checkUserSession } from "../controller/session.controller";

const sessionRouter = Router();

sessionRouter.get("/session", checkUserSession);

export default sessionRouter;
