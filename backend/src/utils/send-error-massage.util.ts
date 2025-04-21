import { Response } from "express";

export type SendErrorMessageData = {
    response: Response,
    statusCode: number,
    resource?: string
}

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