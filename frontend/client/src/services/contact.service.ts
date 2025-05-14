import { FormEvent } from "react";
import { Dispatch, SetStateAction } from "react";
import { isString } from "@shared/utils/form/is-string.util";
import isEmail from "validator/lib/isEmail";
import { endpoints } from "@shared/config/endpoints.config";
import { ErrorMessages, errorMessages } from "@shared/config/error-messages.config";
import { sendErrorWhenHoneyPotIsFilled } from "@shared/utils/form/send-error-message-when-honey-pot-is-filled";

type SendEmailService = (
    event: FormEvent<HTMLFormElement>, 
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>,
    setMessageSent: Dispatch<SetStateAction< boolean | undefined>>
) => Promise<void>

export const sendEmail: SendEmailService = async (event, setErrorMessage, setMessageSent): Promise<void> => {
    
    event.preventDefault();
    const { badRequest, serverError }: ErrorMessages = errorMessages;
    
    const form: HTMLFormElement = event.currentTarget;

    const formData: FormData = new FormData(form);

    sendErrorWhenHoneyPotIsFilled({
        formData: formData,
        setErrorMessage: setErrorMessage
    });

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
                    credentials: 'include', 
                    body: JSON.stringify(sendEmailData)
                });

                setMessageSent(true);
            } catch {
                setErrorMessage && setErrorMessage(serverError);
                throw new Error(serverError);
            }


        } else {
            setErrorMessage && setErrorMessage(badRequest); 
            throw new Error(badRequest);
        }
    } else {
        setErrorMessage && setErrorMessage(badRequest);
        throw new Error(badRequest);
    }
}