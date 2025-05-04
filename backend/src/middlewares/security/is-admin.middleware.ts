import { NextFunction, Request, Response } from 'express';
import { LoggedUser } from '../../types/logged-user.type';
import { sendErrorMessage } from '../../utils/send-error-massage.util';
import { RequestHandler } from 'express';

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