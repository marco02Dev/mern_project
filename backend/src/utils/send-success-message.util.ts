import { Response } from "express";
import { ModelsAllowed } from "../types/models-allowed.type";
import { LoggedUser } from "../types/logged-user.type";

export type SendSuccessMessageData = {
    response: Response,
    statusCode: number,
    data?: ModelsAllowed | ModelsAllowed[] | { _id: string } | LoggedUser
    resource?: string,
    deleteResource?: boolean,
    updateResource?: boolean
}

/**
 * Utility function to standardize sending success responses to clients.
 * 
 * It sends a JSON response with a success flag, a contextual message based on status code and resource/action,
 * and optionally includes data payload.
 * 
 * Typical use cases include confirming resource creation, update, deletion, or generic successful requests.
 * 
 * @param {Object} params - The parameters for sending the success message.
 * @param {Response} params.response - Express response object.
 * @param {number} params.statusCode - HTTP status code (e.g., 200, 201).
 * @param {ModelsAllowed | ModelsAllowed[] | { _id: string } | LoggedUser} [params.data] - Optional data to send in the response.
 * @param {string} [params.resource] - Optional resource name to customize messages (e.g., 'User', 'Course').
 * @param {boolean} [params.deleteResource] - Set to true if the response confirms a resource deletion.
 * @param {boolean} [params.updateResource] - Set to true if the response confirms a resource update.
 * 
 * @returns {Response} Modified Express response object with status and JSON payload.
 * 
 * @example
 * sendSuccessMessage({
 *   response: res,
 *   statusCode: 201,
 *   resource: 'User',
 *   data: createdUser
 * });
 * 
 * // Response JSON:
 * // {
 * //   success: true,
 * //   message: 'User successfully created',
 * //   data: {...} // createdUser data
 * // }
*/

export const sendSuccessMessage = ({response, statusCode, resource, data, deleteResource, updateResource}: SendSuccessMessageData): Response => {

    let message: string;
    const resourceType: string = resource ? resource : "Resource";
    const actionType: string = deleteResource ? "deleted" : "updated";

    switch(statusCode) {
        case(201):
            message = `${resourceType} successfully created`;
        break;

        case(200):
            message = deleteResource || updateResource ? `${resourceType} successfully ${actionType}` : 'Request successfully processed.';
        break;

        default:
            message = 'Operation completed successfully.';
        break;

    }

    const responseJson = data ? {
        success: true,
        message: message,
        data: data
    } : {
        success: true,
        message: message,
    }

    return response
    .status(statusCode)
    .json(responseJson);
}