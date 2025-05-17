import { Request, Response, NextFunction } from "express";
import logger from "@config/libraries/winston.config";
import passport from "passport";
import { sendSuccessMessage } from "@utils/response/send-success-message.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util"
import { PassportController } from "@custom-types/controller.type";

/**
 * **User Login Controller**
 * 
 * Controller for logging in a user using Passport.js with the 'local' strategy.
 *
 * This controller is designed to authenticate users via credentials (e.g., email and password)
 * submitted through a form or request. It performs the following steps:
 *  - Authenticates the user using Passport's `local` strategy
 *  - Handles potential authentication errors
 *  - Starts a login session using `req.logIn`
 *  - Logs each step using Winston for auditing
 *
 * Requires Passport.js to be configured and active in the Express app.
 *
 * @function logUserInController
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - No response is returned directly; success or error is sent via helper utilities.
 *
 * For more details on Passport.js configuration, see: `config/libraries/passport.config.ts`
 */

export const logUserInController: PassportController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate('local', (err: Error, user: any) => {
        if (err) {
            logger.error(`Authentication error: ${err.message}`);
            return next(err);
        }

        if (!user) {
            logger.warn(`Failed login attempt from IP ${req.ip} - Invalid credentials`);
            sendErrorMessage({
                response: res,
                statusCode: 400
            });
            return;
        }

        req.logIn(user, (err) => {
            if (err) {
                logger.error(`Login error for user ${user?.email || 'unknown'}: ${err.message}`);
                return next(err);
            }

            logger.info(`User logged in | Name: ${user.name} | ID: ${user._id} | Role: ${user.role} | IP: ${req.ip} | SessionID: ${req.sessionID}`);

            sendSuccessMessage({
                response: res,
                statusCode: 200,
                data: {
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    role: user.role
                }
            });

            return;
        });
    })(req, res, next);
};