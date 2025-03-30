import { sendSuccessMessage } from "../utils/send-success-message";
import { sendErrorMessage } from "../utils/send-error-massage";
import { ModelsAllowed } from "../types/models-allowed";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { isProductDataInvalid } from "../utils/is-product-data-invalid";
import { isUserDataInvalid } from "../utils/is-user-data-invalid";

type CreateNewDocumentByModelData<T extends object> = {
    Model: Model<T>, 
    request: Request<{}, {}, T>,
    response: Response,
    resourceName: string
};

export const createNewDocumentByModel = async <T extends object>({
    Model,
    request,
    response,
    resourceName
}: CreateNewDocumentByModelData<T>): Promise<void> => {
    const clientData: T = request.body; 

    const isProduct: boolean = resourceName === "Product";

    if (isProduct) {
        if (isProductDataInvalid(clientData as any)) { 
            sendErrorMessage({ response, statusCode: 400 });
            return;
        }
    } else {
        if (isUserDataInvalid(clientData as any)) {
            sendErrorMessage({ response, statusCode: 400 });
            return;
        }
    }

    const newDocument: any = new Model(clientData);
    
    try {
        await newDocument.save();
        sendSuccessMessage({ response, statusCode: 201, resource: resourceName, data: newDocument as ModelsAllowed });
        return;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error creating a new ${resourceName}: ${error.message}`);
            sendErrorMessage({ response, statusCode: 500 });
        }
    }
};
