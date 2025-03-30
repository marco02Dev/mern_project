import { Model, Schema } from "mongoose";
import { sendErrorMessage } from "../utils/send-error-massage";
import { sendSuccessMessage } from "../utils/send-success-message";
import { ModelsAllowed } from "../types/models-allowed";
import { Response } from "express";
import { Request } from "express";

type GetAllDocumentsData<T> = {
    Model: Model<T>, 
    request: Request<{}, {}, T>,
    response: Response,
    resourceName: string
};

export const getAllDocumentsByModel = async <T extends object>({
    Model,
    request,
    response,
    resourceName
}: GetAllDocumentsData<T>): Promise<void> => {
    const isBodyFilled: boolean = Object.keys(request.body).length > 0;

    if (isBodyFilled) {
        sendErrorMessage({ response, statusCode: 400 });
    } else {
        try {
            const documents: ModelsAllowed[] = await Model.find({});
            sendSuccessMessage({ response, statusCode: 200, data: documents });
        } catch {
            sendErrorMessage({ response, statusCode: 404, resource: resourceName });
        }
    }
};

