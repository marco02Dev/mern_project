import { Request, Response } from "express";
import { sendSuccessMessage } from "@utils/response/send-success-message.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { LoggedUser } from "@custom-types/logged-user.type";
import logger from "@config/libraries/winston.config";
import { Controller } from "@custom-types/controller.type";

/**
 * **User Session Controller**
 * 
 * Controller for checking if the current user session is authenticated.
 *
 * This controller performs the following steps:
 *  - Verifies if the user is authenticated via the session.
 *  - If authenticated, returns basic user info (id, name, email, role, etc.).
 *  - If not authenticated, responds with a 401 Unauthorized status.
 *  - Logs each session validation attempt and its result using Winston.
 *
 * Requires Passport.js to be configured and active in the Express app.
 *
 * @function checkUserSessionController
 * @async
 * @param {Request} req - Express request object which may contain the authenticated user.
 * @param {Response} res - Express response object to send success or error messages.
 * @returns {Promise<void>} - No direct return; response is sent via helper utilities.
 * 
 * For more details on Passport.js configuration, see: `config/libraries/passport.config.ts`
 * 
 */

export const checkUserSessionController: Controller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.isAuthenticated && req.isAuthenticated()) {
      const user = req.user as LoggedUser;
      logger.info(`Session validated for user ${user.email} (ID: ${user._id})`);

      sendSuccessMessage({
        response: res,
        statusCode: 200,
        data: {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      logger.error(`Unauthorized session check attempt on ${req.method} ${req.originalUrl}`);
      sendErrorMessage({
        response: res,
        statusCode: 401,
      });
    }
  } catch (error) {
    logger.error("Error in checkUserSessionController:", error);
    sendErrorMessage({
      response: res,
      statusCode: 500,
    });
  }
};