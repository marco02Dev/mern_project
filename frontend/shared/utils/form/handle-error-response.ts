import { Dispatch, SetStateAction } from 'react';
import { errorMessages } from '../../config/error-messages.config';

/**
 * Type definition for the handleErrorResponse function.
 * 
 * @param {number} statusCode - The HTTP status code returned from the server.
 * @param {Dispatch<SetStateAction<string | undefined>>} [setErrorMessage] - Optional state setter for setting the error message in the UI.
 * @returns {Promise<void>} - A promise that resolves to nothing. Throws an error if the statusCode is >= 400.
*/

export type HandleErrorResponse = ({
    statusCode, 
    setErrorMessage
}: {
    statusCode: number, 
    setErrorMessage?: Dispatch<SetStateAction<string | undefined>> | undefined
}) => Promise<void>;

/**
 * Handles HTTP error responses based on the status code.
 * 
 * Maps common status codes to human-readable error messages and optionally sets them in component state.
 * Throws an error with the appropriate message.
 *
 * @param {number} statusCode - The HTTP status code to handle.
 * @param {Dispatch<SetStateAction<string | undefined>>} [setErrorMessage] - Optional setter function to update UI error messages.
 * 
 * @throws {Error} Will throw an error with a message corresponding to the HTTP status code.
*/

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

        if(setErrorMessage) setErrorMessage(errorMessage);

        throw new Error(errorMessage);
    }
};
