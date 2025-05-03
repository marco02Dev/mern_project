import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { sessionConfig } from './config/libraries/express-session.config';
import { port } from './config/system/env.config';
import { connectToDatabase } from './config/system/connect-to-database.config';
import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';
import path from "path";
import contactRouter from './routes/contact.route';
import passport from 'passport';
import { rejectRequestIfHoneyPotIsFilled } from './middlewares/reject-request-if-honey-pot-is-filled.middleware';
import { initializePassport } from './config/libraries/passport.config';
import { corsOptions } from './config/libraries/cors-options.config';
import cookieParser from 'cookie-parser';
import sessionRouter from './routes/session.route';
import https from 'https';
import fs from 'fs';
import frontendRouter from './routes/front-end.route';
import { databaseUri } from './config/system/env.config';
import { memoryLogger } from './middlewares/memory-logger.middleware';
import { sslCredentials } from './config/system/ssl-credentials';

export const reactAppBuildPath = path.join(__dirname, "../../frontend/dist/");
export const indexHtmlPath = path.join(reactAppBuildPath, "index.html");

const app = express();

app.use(cookieParser());
app.use(memoryLogger);

app.use(session(sessionConfig));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(cors(corsOptions));
app.use(express.json());

app.use(rejectRequestIfHoneyPotIsFilled);

app.use("/api", sessionRouter);
app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", contactRouter);
app.use(frontendRouter);

https.createServer(sslCredentials, app).listen(port, '0.0.0.0', () => {
    console.log('Connecting to MongoDB with URI:', databaseUri);
    connectToDatabase();
    console.log(`Server is listen on ${port}`);
});

export default app;