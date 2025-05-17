import { NextFunction, Request, Response } from "express";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { RequestHandler } from "express";

/**
 * `rejectRequestIfHoneyPotIsFilled` is a middleware used primarily for form submission endpoints
 * to detect and block automated spam requests (bots).
 *
 * This middleware checks the hidden `website` field (honeypot field) in the request body. 
 * Since this field is not visible or fillable by legitimate users, a non-empty value is interpreted
 * as an indication of a bot or malicious script attempting to submit the form.
 *
 * If the honeypot field is filled, the middleware responds with a 400 Bad Request error 
 * using the `sendErrorMessage` utility. Otherwise, it calls `next()` to continue the request.
 *
 * @function
 * @param {Request} request - Express request object containing the form data.
 * @param {Response} response - Express response object.
 * @param {NextFunction} next - Express next middleware function.
*/

export const rejectRequestIfHoneyPotIsFilled: RequestHandler = (request: Request, response: Response, next: NextFunction): void => {
    const { website } = request.body;

    if (website && website.trim() !== "") {
        sendErrorMessage({
            response: response,
            statusCode: 400
        });
    } else {
        next();
    }
}