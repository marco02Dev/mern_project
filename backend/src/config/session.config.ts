import { secret, databaseUri } from "./env.config";
import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionConfig: session.SessionOptions = {
  secret: secret as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: true, 
      maxAge: 1000 * 60 * 15,
      sameSite: "none",
      httpOnly: false
  },
  store: MongoStore.create({
    mongoUrl: databaseUri as string,
    ttl: 60 * 15,
  }),
};