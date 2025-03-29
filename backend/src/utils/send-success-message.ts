import { Response } from "express";
import { ProductSchema } from "../models/product.model";

export type SendSuccessMessageData = {
    response: Response,
    statusCode: number,
    data?: ProductSchema
    resource?: string
}

export const sendSuccessMessage = ({response, statusCode, resource, data}: SendSuccessMessageData): Response => {

    let message: string;
    const resourceType: string = resource ? resource : "Resource";

    switch(statusCode) {
        case(201):
            message = `${resourceType} successfully created`;
        break;

        case(200):
            message = 'Request successfully processed.';
        break;

        default:
            message = 'Success';
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