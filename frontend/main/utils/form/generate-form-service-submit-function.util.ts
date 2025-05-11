import { FormEvent, SetStateAction, Dispatch as ReactStateDispatch } from "react";
import { sendEmail } from "../../services/contact.service";
import { loginService } from "../../services/login.service";
import { signUpService } from "../../services/singup.service";
import { AllowedServices } from "../../types/service.type";
import { Dispatch } from "@reduxjs/toolkit";
import { UpdateProductFormContextStateObject } from "../../../admin/src/contexts/UpdateProductFormProvider";
import { NavigateFunction } from "react-router-dom";

type GenerateFormServiceSubmitFunction = {
    service: AllowedServices,
    dispatch: Dispatch,
    updateProductFormState?: UpdateProductFormContextStateObject,
    setUpdateProductFormSetState?: ReactStateDispatch<SetStateAction<UpdateProductFormContextStateObject>>;
    setErrorMessage: ReactStateDispatch<SetStateAction<string | undefined>>,
    navigateFunction?: NavigateFunction,
    setMessageSent?: ReactStateDispatch<SetStateAction<boolean | undefined>>,
    setCrateProductForm?: ReactStateDispatch<SetStateAction<boolean>>,
    setProductCreated?: ReactStateDispatch<SetStateAction<boolean>>

}

export const generateFormServiceSubmitFunction = ({
    service, 
    dispatch, 
    setErrorMessage,
    navigateFunction,
    setMessageSent,
}: GenerateFormServiceSubmitFunction) => {
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