import { PassportStatic } from "passport";
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/users.model';

export const initializePassport = (passport: PassportStatic) => {

    const authenticateUser: VerifyFunctionWithRequest = async (
        req,
        email: string,
        password: string,
        done: (error: any, user?: Express.User | false, options?: { message: string }) => void
    ) => {
        const { name, surname } = req.body;

        if (!name || !surname || !email || !password) {
            return done(null, false, { message: "Missing user data" });
        }

        try {
            const userFound = await User.findOne({ name, surname, email });

            if (userFound) {
                const isPasswordMatching = await bcrypt.compare(password, userFound.password);

                if (isPasswordMatching) {
                    console.log(`User ${name} ${surname} logged in`);
                    return done(null, userFound);
                } else {
                    console.log("Password is not matching");
                    return done(null, false, { message: "Incorrect password" });
                }
            } else {
                console.log("User doesn't exist");
                return done(null, false, { message: "User not found" });
            }

        } catch (error) {
            console.error(`Error during login for user ${name} ${surname}:`, error);
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