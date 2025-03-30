import { Router, Request, Response } from "express";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";
import { sendSuccessMessage, SendSuccessMessageData } from "../utils/send-success-message";
import User from "../models/users.model";
import { UsersSchema } from "../models/users.model";
import { isUserDataInvalid } from "../utils/is-user-data-invalid";

const usersRouter: Router = Router();

usersRouter.post("/signup", async (request: Request, response: Response): Promise<any> => {
    const user: UsersSchema = request.body;

    if(isUserDataInvalid(user)) {
        const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 400};
        return sendErrorMessage(sendErrorMessageData);
    } else {
        const newUser: UsersSchema = new User(user);
        try {
            await newUser.save();
            return sendSuccessMessage({response: response, statusCode: 201, resource: "User"});
        } catch(erorr) {
            if(erorr instanceof Error) {
                console.log(`Error creating a new User: ${erorr.message}`)
                const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 500};
                return sendErrorMessage(sendErrorMessageData);
            }
        }
    }

});

usersRouter.post("/login", async (request: Request, response: Response): Promise<any> => {
    const user: UsersSchema = request.body;
    const {name, surname, email, password}: UsersSchema = user;

    if(isUserDataInvalid(user)) {
        const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 400};
        return sendErrorMessage(sendErrorMessageData);
    } else {
        try {
            const user = await User.findOne({ name, surname, email, password });
            if(user) {
                console.log(`User ${name} ${surname} logged in`);
                return sendSuccessMessage({response: response, statusCode: 200});
            }
        } catch(error) {
            console.log(`User ${name} ${surname} not found`);
            const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 404, resource: "User"};
            return sendErrorMessage(sendErrorMessageData);
        }
    }
});

export default usersRouter;