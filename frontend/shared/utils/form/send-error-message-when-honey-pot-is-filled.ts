import { Dispatch, SetStateAction } from "react";
import { ErrorMessages, errorMessages } from "@shared/config/error-messages.config";

export const sendErrorWhenHoneyPotIsFilled = ({
    formData,
    setErrorMessage,
}: {
    formData: FormData,
    setErrorMessage?: Dispatch<SetStateAction<string | undefined>>
}): void => {
    const honeyPot: FormDataEntryValue | null = formData.get("website");
    const { badRequest }: ErrorMessages = errorMessages;
    if (honeyPot !== null && honeyPot.toString().trim() !== "") {
        if(setErrorMessage) setErrorMessage(badRequest); 
        throw new Error(badRequest);        
    }
}