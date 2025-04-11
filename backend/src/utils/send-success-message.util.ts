import { Response } from "express";
import { ModelsAllowed } from "../types/models-allowed.type";

export type SendSuccessMessageData = {
    response: Response,
    statusCode: number,
    data?: ModelsAllowed | ModelsAllowed[] | { _id: string }
    resource?: string,
    deleteResource?: boolean,
    updateResource?: boolean
}

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