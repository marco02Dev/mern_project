import { Router } from "express";
import { sendEmail } from "../controller/contact.controller";
import { contactEndpointName } from "../config/system/endpoints.config";
import { rejectRequestIfHoneyPotIsFilled } from "../middlewares/security/reject-request-if-honey-pot-is-filled.middleware";

const contactRouter: Router = Router();
const defaultEndpoint: string = `/${contactEndpointName}`;

contactRouter.post(defaultEndpoint, rejectRequestIfHoneyPotIsFilled, sendEmail);

export default contactRouter;
