import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { sessionConfig } from './config/session.config';
import { Express, Response, Request } from 'express';
import { port } from './config/env.config';
import { connectToDatabase } from './config/connect-to-database.config';
import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';
import path from "path";
import contactRouter from './routes/contact.route';
import passport from 'passport';
import { rejectRequestIfHoneyPotIsFilled } from './middlewares/reject-request-if-honey-pot-is-filled.middleware';
import { initializePassport } from './config/passport.config';
import { corsOptions } from './config/cors-options.config';
import crypto from 'crypto';

const app: Express = express();

app.use(session(sessionConfig));

initializePassport(passport);

app.use(cors(corsOptions));
app.use(express.json());
app.use(rejectRequestIfHoneyPotIsFilled);

app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);
    next();
  });

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", contactRouter);

app.get('/api/init-session', (req: Request, res: Response) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    (req.session as any).nonce = nonce; // Cast esplicito a 'any'
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Errore nel salvataggio della sessione' });
      }
      res.json({ nonce: (req.session as any).nonce });
    });
  });

app.listen(port, '0.0.0.0', (): void => {
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;