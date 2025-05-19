import { sendSuccessMessage } from "@utils/response/send-success-message.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { Response } from "express";
import { Model } from "mongoose";

type CreateNewDocumentByModelData<T extends object> = {
    Model: Model<T>;
    clientData: T;
    response: Response;
    resourceName: string;
};

export const createNewDocumentByModel = async <T extends object>({
    Model,
    clientData,
    response,
    resourceName
}: CreateNewDocumentByModelData<T>): Promise<void> => {
    try {
        const newDocument: any = new Model(clientData);
        await newDocument.save();
        sendSuccessMessage({ response, statusCode: 201, resource: resourceName, data: newDocument});
    } catch (error) {
        console.error(`Error creating a new ${resourceName}:`, error);
        sendErrorMessage({ response, statusCode: 500 });
    }
};
