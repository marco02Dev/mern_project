import { secret, databaseUri } from "./env.config";
import session from "express-session";
import MongoStore from "connect-mongo";
import { isProduction } from "./env.config";

const maxAge: number = isProduction 
  ? 1000 * 60 * 60 * 24 * 30
  : 1000 * 60 * 125;  

export const sessionConfig: session.SessionOptions = {
  secret: secret as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, 
    maxAge: maxAge,
    sameSite: "none",
    httpOnly: false
  },
  store: MongoStore.create({
    mongoUrl: databaseUri as string,
    ttl: 60 * 15,
  }),
};