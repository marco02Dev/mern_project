import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { LoggedUser } from "../types/logged-user.type";
import logger from "../config/libraries/winston.config";

/**
 * `checkUserSession` is a session controller used to verify if the current user is authenticated.
 * 
 * This route is connected to `sessionRoute` and is typically called during the **initial render**
 * of the React application to restore the user's session and populate the Redux store with
 * authenticated user data (e.g., after a page reload or returning to the app).
 * 
 * If the session is valid, it returns basic user info (id, name, email, etc.).
 * Otherwise, it responds with a 401 Unauthorized status.
 * 
 * @param {Request} req - Express HTTP request object (with potential session info).
 * @param {Response} res - Express HTTP response object.
 * 
 * @returns JSON response indicating the session status and user data if authenticated.
*/

export const checkUserSession = (req: Request, res: Response): any => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    const user = req.user as LoggedUser;
    logger.info(`Session validated for user ${user.email} (ID: ${user._id})`)

    return sendSuccessMessage({
      response: res,
      statusCode: 200,
      data: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      }
    });
  } else {
    logger.error(`Unauthorized session check attempt on ${req.method} ${req.originalUrl}`);
    return sendErrorMessage({
      response: res,
      statusCode: 401,
    });
  }
};