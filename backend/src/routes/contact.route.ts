import { Router } from "express";
import { sendEmailController } from "../controller/contact/send-email.controller";
import { contactEndpointName } from "../config/system/endpoints.config";
import { rejectRequestIfHoneyPotIsFilled } from "../middlewares/security/reject-request-if-honey-pot-is-filled.middleware";

/**
 * Router handling contact form submissions.
 * 
 * Provides a POST endpoint to receive contact requests and send emails.
 * Includes a honeypot middleware to reject spam or bot submissions.
*/

const contactRouter: Router = Router();
const defaultEndpoint: string = `/${contactEndpointName}`;

contactRouter.post(defaultEndpoint, rejectRequestIfHoneyPotIsFilled, sendEmailController);

export default contactRouter;
