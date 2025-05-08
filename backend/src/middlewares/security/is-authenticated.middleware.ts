import { NextFunction, Request, Response } from 'express';
import { sendErrorMessage } from '../../utils/send-error-massage.util';
import { RequestHandler } from 'express';

export const isAuthenticated: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log("User is authenticated")
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    sendErrorMessage({
        response: res,
        statusCode: 403,
    });
    return;
  }
  next();
};
