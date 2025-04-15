import { Router } from "express";
import { sendEmail } from "../controller/contact.controller";
import { contactEndpointName } from "../config/env.config";

const contactRouter: Router = Router();
const defaultEndpoint: string = `/${contactEndpointName}`;

contactRouter.post(defaultEndpoint, sendEmail);

export default contactRouter;
