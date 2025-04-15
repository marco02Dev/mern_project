import { SendEmailService } from "../types/service.type";
import { isString } from "../utils/is-string.util";
import isEmail from "validator/lib/isEmail";
import { endpoints } from "../config/endpoints.config";

export const sendEmail: SendEmailService = async (event, sendErrorMessage): Promise<void> => {
    event.preventDefault();
    
    const form: HTMLFormElement = event.currentTarget;

    const formData = new FormData(form);

    const name: FormDataEntryValue | null = formData.get('name');
    const email: FormDataEntryValue | null = formData.get("email");
    const message: FormDataEntryValue | null = formData.get('message');

    if(name && message && email) {
        if(isString(name) && isString(message) && isString(email) && isEmail(email as string)) {

            type SendEmailData = {
                name: string,
                message: string,
                email: string
            }

            const sendEmailData: SendEmailData = {
                name: name as string,
                message: message as string,
                email: email as string
            }

            try {
                await fetch(endpoints.contactUsEndpoint, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(sendEmailData)
                });
            } catch {
                sendErrorMessage && sendErrorMessage("Something went wrong, please try again later");
                throw new Error("Something went wrong, please try again later");
            }


        } else {
            sendErrorMessage && sendErrorMessage("Some fields are invalid or missing"); 
            throw new Error("Some fields are invalid or missing");
        }
    } else {
        sendErrorMessage && sendErrorMessage("Some fields are invalid or missing");
        throw new Error("Some fields are invalid or missing");
    }
}