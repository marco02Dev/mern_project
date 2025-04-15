import { Dispatch, SetStateAction } from "react";
import { ErrorMessages, errorMessages } from "../config/error-messages.config";

export const sendErrorWhenHoneyPotIsFilled = ({
    formData,
    setErrorMessage,
}: {
    formData: FormData,
    setErrorMessage?: Dispatch<SetStateAction<string | undefined>>
}): void => {
    const honeyPot: FormDataEntryValue | null = formData.get("website");
    const { badRequest }: ErrorMessages = errorMessages;
    console.log("bot alert");
    if (honeyPot !== null && honeyPot.toString().trim() !== "") {
        setErrorMessage && setErrorMessage(badRequest); 
        throw new Error(badRequest);        
    }
}