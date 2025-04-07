import { Router } from "express";
import { sendEmail } from "../controller/contact.controller";
import { productsEndpointName } from "../config/env";

const contactRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;

contactRouter.post(defaultEndpoint, sendEmail);

export default contactRouter;
