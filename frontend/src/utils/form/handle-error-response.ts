import { Dispatch, SetStateAction } from 'react';
import { errorMessages } from '../../config/error-messages.config';

export type HandleErrorResponse = ({
    statusCode, 
    setErrorMessage
}: {
    statusCode: number, 
    setErrorMessage?: Dispatch<SetStateAction<string | undefined>> | undefined
}) => Promise<void>;

export const handleErrorResponse: HandleErrorResponse = async ({statusCode, setErrorMessage}): Promise<void> => {

    if (statusCode >= 400) {
        let errorMessage: string;

        switch (statusCode) {
            case 400:
                errorMessage = errorMessages.badRequest;
                break;
            case 409:
                errorMessage = errorMessages.emailExists;
                break;
            case 404:
                errorMessage = errorMessages.resourceNotFound;
                break;
            case 500:
                errorMessage = errorMessages.serverError;
                break;
            default:
                errorMessage = errorMessages.serverError;
                break;
        }

        setErrorMessage && setErrorMessage(errorMessage);

        throw new Error(errorMessage);
    }
};
