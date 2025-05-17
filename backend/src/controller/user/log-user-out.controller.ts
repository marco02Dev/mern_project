import logger from "../../config/libraries/winston.config";
import { LoggedUser } from "../../types/logged-user.type";
import { Request, Response } from "express";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { sendSuccessMessage } from "../../utils/send-success-message.util";
import { Controller } from "../../types/controller.type";

/**
 * **User Logout Controller**
 * 
 * Controller for logging out an authenticated user using Passport.js.
 *
 * This controller is designed for authenticated users and is used across all routes that require logout functionality.
 * It performs the following steps:
 *  - Validates if a user is currently authenticated
 *  - Logs out the user using Passport's `req.logout` method
 *  - Destroys the user session via `req.session.destroy`
 *  - Logs each action using Winston for auditing
 *
 * Requires Passport.js to be configured and active in the Express app.
 *
 * @function logUserOutController
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - No response is returned directly; success or error is sent via helper utilities.
 *
 * For more details on Passport.js configuration, see: `config/libraries/passport.config.ts`
*/

export const logUserOutController: Controller = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as LoggedUser;

    if (!user) {
        logger.warn('Logout attempted without an authenticated user');
        sendErrorMessage({ response: res, statusCode: 401 });
        return;
    }

    const { name: userName, _id: userId, role } = user;

    req.logout((err) => {
        if (err) {
            logger.error(`Logout error for user ${userName} (${userId}): ${err.message}`);
            sendErrorMessage({ response: res, statusCode: 500 });
            return;
        }

        req.session.destroy((err) => {
            if (err) {
                logger.error(`Session destruction failed for user ${userName} (${userId}): ${err.message}`);
                sendErrorMessage({ response: res, statusCode: 500 });
                return;
            }

            logger.info(`User logged out | Name: ${userName} | ID: ${userId} | Role: ${role}`);
            sendSuccessMessage({ response: res, statusCode: 200 });
            return;
        });
    });
};