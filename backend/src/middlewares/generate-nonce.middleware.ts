import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const generateNonce = (req: Request, res: Response, next: NextFunction) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.locals.nonce = nonce;
    console.log(nonce)
    next();
};
