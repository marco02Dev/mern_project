import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const setFormToken = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as typeof req.session & { formToken?: string };

  if (!session.formToken) {
    session.formToken = crypto.randomBytes(32).toString('hex');
  }

  next();
};