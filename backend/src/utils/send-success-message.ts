import { Response } from "express";
import { ProductSchema } from "../models/product.model";

export type SendSuccessMessageData = {
    response: Response,
    statusCode: number,
    data?: ProductSchema | ProductSchema[],
    resource?: string,
    deleteResource?: boolean
}

export const sendSuccessMessage = ({response, statusCode, resource, data, deleteResource}: SendSuccessMessageData): Response => {

    let message: string;
    const resourceType: string = resource ? resource : "Resource";

    switch(statusCode) {
        case(201):
            message = `${resourceType} successfully created`;
        break;

        case(200):
            message = deleteResource ? `${resourceType} successfully deleted` : 'Request successfully processed.';
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