import { Response } from "express";

export type SendErrorMessageData = {
    response: Response,
    statusCode: number,
    resource?: string
}

/**
 * `sendErrorMessage` is a utility function that standardizes the way error responses are sent
 * from the server based on common HTTP status codes.
 *
 * It returns a JSON response with a generic, user-friendly message corresponding to the
 * provided status code. This helps ensure consistent error messaging across the application.
 *
 * @param {Object} params - The parameters for sending the error message.
 * @param {Response} params.response - The Express response object.
 * @param {number} params.statusCode - The HTTP status code to determine the error message.
 * @param {string} [params.resource] - Optional resource name to personalize the 404 and 409 error message.
 *
 * @returns {Response} The modified Express response object with status and JSON payload.
 *
 * @example
 * sendErrorMessage({
 *   response: res,
 *   statusCode: 404,
 *   resource: 'User'
 * });
 *
 * // Output:
 * // {
 * //   success: false,
 * //   message: 'User not found'
 * // }
 * 
 * @example
 * sendErrorMessage({
 *   response: res,
 *   statusCode: 400
 * });
 *
 * // Output:
 * // {
 * //   success: false,
 * //   message: 'Please provide all requested fields or enter valid data'
 * // }
*/

export const sendErrorMessage = ({response, statusCode, resource}: SendErrorMessageData): Response => {

    let message: string;
 
    switch(statusCode) {
        case(400): 
            message = 'Please provide all requested fields or enter valid data';
        break;

        case(500): 
            message = "Internal server error";
        break;

        case(404): 
            message = resource ? `${resource} not found` : 'Resource not found';
        break;

        case(403): 
            message = "You don't have permission to access this resource";
        break;

        case(409):
            message = resource ? `A ${resource} with the provided data already exists` : 'A resource with the provided data already exists';
        break;

        default: 
            message = 'error';
        break;
    }

    return response
    .status(statusCode)
    .json({
        success: false,
        message: message
    })
}