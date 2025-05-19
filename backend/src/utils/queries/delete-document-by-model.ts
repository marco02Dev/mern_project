import { Request, Response } from "express";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { sendSuccessMessage } from "@utils/response/send-success-message.util";
import { Model } from "mongoose";

type DeleteDocumentByModelData<T> = {
    Model: Model<T>
    request: Request<{id: string}>,
    response: Response,
    resourceName: string
}

type DeleteDocumentByModel = <T extends object>({request, response, Model, resourceName}: DeleteDocumentByModelData<T>) => Promise<void>;

export const deleteDocumentByModel: DeleteDocumentByModel = async ({request, response, Model, resourceName}) => {
    const {id}: {id: string} = request.params;

    if(id) {
        try {
            await Model.findByIdAndDelete(id);
            sendSuccessMessage({response: response, statusCode: 200, resource: resourceName, deleteResource: true});
            return;
        } catch {
            sendErrorMessage({response: response, statusCode: 404, resource: resourceName});        
            return;
        }     
    } else {
        sendErrorMessage({response: response, statusCode: 404, resource: resourceName});        
        return;
    }
}