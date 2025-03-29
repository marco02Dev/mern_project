import { Response } from "express";

export type SendErrorMessageData = {
    response: Response,
    statusCode: number
}

export const sendErrorMessage = ({response, statusCode}: SendErrorMessageData): Response => {

    let message: string;

    switch(statusCode) {
        case(400): 
            message = 'Please provide all requested fields or enter valid data';
            break;
        case(500): 
            message = "Internal server error";
            break;
        case(404): 
            message = 'Not found';
        default: 
            message = 'error';
    }

    return response
    .status(statusCode)
    .json({
        success: false,
        message: message
    })
}