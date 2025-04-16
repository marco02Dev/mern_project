import { Router } from "express";
import { sessionEndpointName } from "../config/env.config";
import { Request, Response } from "express";
import crypto from 'crypto';

const sessionRoute: Router = Router();
const defaultEndpoint = `/${sessionEndpointName}`;

sessionRoute.get(`${defaultEndpoint}`, (req: Request, res: Response) => {

    const nonce = crypto.randomBytes(16).toString('base64');
    (req.session as any).nonce = nonce; // Cast esplicito a 'any'
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Errore nel salvataggio della sessione' });
      }
      res.json({ nonce: (req.session as any).nonce });
    });

    console.log("Session ID:", req.sessionID);
});

export default sessionRoute;
