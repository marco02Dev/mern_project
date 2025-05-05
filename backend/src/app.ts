import express from "express";
import { isProduction } from "./config/system/env.config";
import { memoryLogger } from "./middlewares/performance/memory-logger.middleware";
import cors from 'cors';
import { corsOptions } from "./config/libraries/cors-options.config";
import cookieParser from "cookie-parser";
import session from "express-session";
import { sessionConfig } from "./config/libraries/express-session.config";
import { initializePassport } from "./config/libraries/passport.config";
import passport from "passport";
import sessionRouter from "./routes/session.route";
import productsRouter from "./routes/products.route";
import usersRouter from "./routes/users.route";
import contactRouter from "./routes/contact.route";
import frontendRouter from "./routes/front-end.route";

const app = express();

if(!isProduction) {
  app.use(memoryLogger);
  app.use(cors(corsOptions));
}

app.use(cookieParser());
app.use(session(sessionConfig));
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/api", sessionRouter);
app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", contactRouter);
app.use(frontendRouter);

export default app;