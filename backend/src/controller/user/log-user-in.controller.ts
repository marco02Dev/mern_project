import { Request, Response, NextFunction } from "express";
import logger from "../../config/libraries/winston.config";
import passport from "passport";
import { sendSuccessMessage } from "../../utils/send-success-message.util";
import { sendErrorMessage } from "../../utils/send-error-massage.util";

export const logUserInController = (req: Request, res: Response, next: NextFunction) => {
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