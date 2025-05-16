import { NextFunction, Request, Response } from 'express';
import { LoggedUser } from '../../types/logged-user.type';
import { sendErrorMessage } from '../../utils/send-error-massage.util';
import { RequestHandler } from 'express';

/**
 * `isAdmin` is an admin-only middleware for Express routes.
 *
 * This middleware is intended to protect sensitive admin services and endpoints by ensuring:
 * - The user is authenticated via Passport.js (using `req.isAuthenticated()`)
 * - The authenticated user has the role `"admin"`
 *
 * If the request fails either check, it responds with a 403 Forbidden status using the `sendErrorMessage` utility.
 *
 * @function
 * @param {Request} req - Express request object extended by Passport.js (should include `req.user` with a `role`).
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
*/

export const isAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    sendErrorMessage({
        response: res,
        statusCode: 403,
    });

    return;
  }

  const user = req.user as LoggedUser;

  if (user.role !== 'admin') {
    sendErrorMessage({
        response: res,
        statusCode: 403,
    });

    return;
  }

  next();
}