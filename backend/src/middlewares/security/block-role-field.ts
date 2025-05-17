import { Request, Response, NextFunction } from 'express';
import { sendErrorMessage } from '@utils/response/send-error-massage.util';

/**
 * `blockRoleField` is a **middleware designed for registration forms** to enhance security.
 * 
 * Its primary purpose is to prevent clients from manually assigning a `role` during user registration,
 * ensuring that only backend services with access to the database (e.g., admin panels or services with elevated privileges)
 * can assign roles to users.
 * 
 * If the `role` field is present in the request body, it is deleted and a `400 Bad Request` is returned.
 * 
 * This helps to mitigate unauthorized role elevation or privilege escalation by enforcing strict backend control.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
*/

export const blockRoleField = (req: Request, res: Response, next: NextFunction) => {
  if ('role' in req.body) {
    delete (req.body as any).role;

    sendErrorMessage({
      response: res,
      statusCode: 400,
    });
    return;
  }

  next();
}