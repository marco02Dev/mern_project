import logger from "../../config/libraries/winston.config";
import { LoggedUser } from "../../types/logged-user.type";
import { Request, Response } from "express";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { sendSuccessMessage } from "../../utils/send-success-message.util";

export const logUserOutController = (req: Request, res: Response) => {
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