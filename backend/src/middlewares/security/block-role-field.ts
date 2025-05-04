import { Request, Response, NextFunction } from 'express';
import { sendErrorMessage } from '../../utils/send-error-massage.util';

export function blockRoleField(req: Request, res: Response, next: NextFunction) {
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