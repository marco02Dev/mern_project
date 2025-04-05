import { isUserDataInvalid } from "../utils/is-user-data-invalid.util";
import { isProductDataInvalid } from "../utils/is-product-data-invalid.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { UsersSchema } from "../models/users.model";
import { ProductSchema } from "../models/product.model";
import { ModelsAllowed } from "../types/models-allowed.type";

type UpdateDocumentByModelData<T> = {
    Model: Model<T>,
    request: Request<{id: string}, {}, T>,
    response: Response,
    resourceName: string
}

type SendErrorData = {
    response: Response,
    documentName: string,
    resourceName?: string
} | {
    response: Response,
    documentName?: string,
    resourceName: string    
}

const sendBadRequestError = ({response, documentName}: SendErrorData): void => {
    console.log(`Bad request, ${documentName} not updated`)
    sendErrorMessage({response: response, statusCode: 400});
    return;
}

const sendNotFoundError = ({response, documentName, resourceName}: SendErrorData): void => {
    const document: string = documentName ? documentName : "";
    console.log(`${resourceName} "${document}" not found`);
    sendErrorMessage({response: response, statusCode: 404, resource: "Product"});
}

export const updateDocumentByModel = async <T extends Object>({Model, request, response, resourceName}: UpdateDocumentByModelData<T>): Promise<void> => {
    const {id}: {id: string} = request.params;
    if(id) {
        const clientData: any = request.body;
        const isProduct: boolean = resourceName === "Product";
        let documentName: string;

        if(isProduct) {
            if(isProductDataInvalid(clientData)) {
                sendBadRequestError({response: response, resourceName: resourceName});
            }
            const {name}: ProductSchema = clientData
            documentName = name;

        } else {
            if(isUserDataInvalid(clientData)) {
                sendBadRequestError({response: response, resourceName: resourceName});
            }
            const {name}: UsersSchema = clientData
            documentName = name;
        }

        try {
            const DocumentUpdated: ModelsAllowed | null = await Model.findByIdAndUpdate(id, clientData, {new: true});
            if(DocumentUpdated) {
                sendSuccessMessage({
                    response: response,
                    statusCode: 200,
                    data: DocumentUpdated,
                    resource: resourceName,
                    updateResource: true
                });
                return;
            } 
            } catch {
                sendNotFoundError({response: response, documentName: documentName, resourceName: resourceName});
                return;
            }
    } else {
        sendNotFoundError({response: response, resourceName: resourceName})
    } 
}