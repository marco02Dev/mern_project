import { NextFunction, Request, Response } from 'express';
import { LoggedUser } from '../types/logged-user.type';
import { sendErrorMessage } from '../utils/send-error-massage.util';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return sendErrorMessage({
        response: res,
        statusCode: 403,
    });
  }

  const user = req.user as LoggedUser;

  if (user.role !== 'admin') {
    return sendErrorMessage({
        response: res,
        statusCode: 403,
    });
  }

  next();
}