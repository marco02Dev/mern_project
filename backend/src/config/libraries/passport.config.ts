import { PassportStatic } from "passport";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../../models/users.model';
import logger from "./winston.config";

/**
 * Configures Passport.js with local authentication strategy.
 * 
 * This function sets up user login via email and password using `passport-local`.
 * It verifies user credentials (name, surname, email, and password) and integrates
 * session handling with `serializeUser` and `deserializeUser`.
 * 
 * This setup is used in the authentication flow of the application, including user routes.
 * 
 * @param {PassportStatic} passport - The Passport instance passed from the main server config.
*/

export const initializePassport = (passport: PassportStatic) => {

    const authenticateUser: VerifyFunctionWithRequest = async (
        req,
        email: string,
        password: string,
        done: (error: any, user?: Express.User | false, options?: { message: string }) => void
    ) => {
        const { name, surname } = req.body;

        if (!name || !surname || !email || !password) {
            logger.warn(`Login attempt failed: missing credentials from ${req.ip}`);
            return done(null, false, { message: "Missing user data" });
        }

        try {
            const userFound = await User.findOne({ name, surname, email });

            if (userFound) {
                const isPasswordMatching = await bcrypt.compare(password, userFound.password);

                if (isPasswordMatching) {
                    logger.info(`User ${name} ${surname} (ID: ${userFound._id}) successfully logged in`);
                    return done(null, userFound);
                } else {
                    logger.warn(`Login failed for ${name} ${surname}: incorrect password`);
                    return done(null, false, { message: "Incorrect password" });
                }
            } else {
                logger.warn(`Login attempt with unknown user: ${name} ${surname} (${email})`);
                return done(null, false, { message: "User not found" });
            }

        } catch (error) {
            logger.error(`Error during login for user ${name} ${surname}:`, error);
            return done(error);
        }
    };

    const options: IStrategyOptionsWithRequest = {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    };

    passport.use(new LocalStrategy(options, authenticateUser));

    passport.serializeUser((user: any, done) => {
        done(null, user._id); // salvi solo l'ID nella sessione
    });
    
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};