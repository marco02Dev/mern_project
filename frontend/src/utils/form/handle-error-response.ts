import { Dispatch, SetStateAction } from 'react';
import { errorMessages } from '../../config/error-messages.config';

export type HandleErrorResponse = ({
    response, 
    setErrorMessage
}: {
    response: Response, 
    setErrorMessage: Dispatch<SetStateAction<string | undefined>> | undefined
}) => Promise<void>;

export const handleErrorResponse: HandleErrorResponse = async ({response, setErrorMessage}): Promise<void> => {
    console.log('Status code:', response.status);

    if (!response.ok) {
        let errorMessage: string;

        switch (response.status) {
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