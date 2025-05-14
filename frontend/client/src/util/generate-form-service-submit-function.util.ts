import { FormEvent, SetStateAction, Dispatch as ReactStateDispatch } from "react";
import { sendEmail } from "@client/services/contact.service";
import { loginService } from "@client/services/login.service";
import { signUpService } from "@client/services/singup.service";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

type GenerateClientFormServiceSubmitFunction  = {
    service: "login" | "send-email" | "sign-up" ,
    dispatch: Dispatch,
    setErrorMessage: ReactStateDispatch<SetStateAction<string | undefined>>,
    navigateFunction?: NavigateFunction,
    setMessageSent?: ReactStateDispatch<SetStateAction<boolean | undefined>>,

}

export const generateClientFormServiceSubmitFunction = ({
    service, 
    dispatch, 
    setErrorMessage,
    navigateFunction,
    setMessageSent,
}: GenerateClientFormServiceSubmitFunction) => {
    return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (service === "send-email" && setErrorMessage && setMessageSent) {
            sendEmail(event, setErrorMessage, setMessageSent);
        } else if (service === "login") {
            loginService(event, dispatch, navigateFunction, setErrorMessage);
        } else if (service === "sign-up") {
            signUpService(event, dispatch, navigateFunction, setErrorMessage);
        } 
    };
}