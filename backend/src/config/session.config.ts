import { secret } from "./env.config";
import session from "express-session";

export const sessionConfig: session.SessionOptions = {
    secret: secret as string, 
    resave: false,
    saveUninitialized: false, 
    cookie: {
      secure: false, 
      maxAge: 1000 * 60 * 15 
    }
  };
  