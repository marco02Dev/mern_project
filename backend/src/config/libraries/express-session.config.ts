import { secret, databaseUri } from "../system/env.config";
import session from "express-session";
import MongoStore from "connect-mongo";
import { isProduction } from "../system/env.config";

const maxAge: number = isProduction 
  ? 1000 * 60 * 60 * 24 * 30
  : 1000 * 60 * 125; 
  
/**
 * Express Session Configuration
 * 
 * Configuration object for `express-session` middleware using a MongoDB store.
 * This setup supports secure session handling with customizable session lifetimes.
 * 
 * Key features:
 * - Uses `connect-mongo` to persist sessions in MongoDB
 * - Adjusts `cookie.maxAge` based on environment (longer in production)
 * - Enables secure cookies with `SameSite=None` and `secure: true`
 * 
 * @property {string} secret - Secret key used to sign the session ID cookie.
 * @property {boolean} resave - Prevents resaving sessions if unmodified.
 * @property {boolean} saveUninitialized - Prevents saving uninitialized sessions.
 * @property {Object} cookie - Cookie options for the session.
 * @property {boolean} cookie.secure - Ensures cookies are sent only over HTTPS.
 * @property {number} cookie.maxAge - Session expiration time (in milliseconds).
 * @property {string} cookie.sameSite - Allows cross-site cookie usage.
 * @property {boolean} cookie.httpOnly - Controls access to cookies via JS.
 * @property {MongoStore} store - Session store backed by MongoDB.
*/

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