import { NextFunction, Request, Response } from 'express';
import { sendErrorMessage } from '../../utils/send-error-massage.util';
import { RequestHandler } from 'express';

/**
 * `isAuthenticated` is a middleware designed for both user and admin services and their related endpoints.
 *
 * It ensures that a user is authenticated before accessing protected routes by leveraging `req.isAuthenticated()`,
 * a method provided by Passport.js in conjunction with Express-session.
 *
 * This adds a security layer by blocking access to unauthorized users for sensitive operations such as accessing
 * user dashboards, managing content, or performing admin actions.
 *
 * If the request is unauthenticated, it responds with a 403 Forbidden status using the `sendErrorMessage` utility.
 *
 * @function
 * @param {Request} req - Express request object, extended by Passport.js to include `isAuthenticated()`.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
*/

export const isAuthenticated: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    sendErrorMessage({
        response: res,
        statusCode: 403,
    });
    return;
  }
  next();
};
