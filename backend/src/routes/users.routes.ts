import { Router, Request, Response } from "express";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";
import User from "../models/users.model";
import { UsersSchema } from "../models/users.model";
import { validateEmail } from "../utils/validate-email";
import { validatePassword } from "../utils/validate-password";

const usersRouter = Router();

usersRouter.post("/signup", async (request: Request, response: Response): Promise<any> => {
    const user: UsersSchema = request.body;

    if(user) {
        const {name, surname, email, password}: UsersSchema = user;
        const isMissingData: boolean = !name || !surname || !email || !password;
        const isEmail: boolean = validateEmail(email);
        const isStrongPassword: boolean = validatePassword(password);
        if(isMissingData || !isEmail || !isStrongPassword ) {
            const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 400};
            return sendErrorMessage(sendErrorMessageData);
        } else {
            const newUser: UsersSchema = new User(user);
            try {
                await newUser.save();
                return response
                .status(201)
                .json({
                    success: true,
                    message: `User ${name} ${surname} successfully created`
                })
            } catch(erorr) {
                if(erorr instanceof Error) {
                    console.log(`Error in create a new User: ${erorr.message}`)
                    const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 500};
                    return sendErrorMessage(sendErrorMessageData);
                }
            }
        }
    } else {
        const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 400};
        return sendErrorMessage(sendErrorMessageData);
    }
});

export default usersRouter;