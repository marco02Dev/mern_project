import { Model } from "mongoose";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { ModelsAllowed } from "../types/models-allowed.type";
import { Response, Request } from "express";

type GetAllDocumentsData<T> = {
    Model: Model<T>,
    request: Request<{}, { limit: string }, T>,
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
    const { limit, latest }: any = request.query;
    const LimitNumber: number = parseInt(limit);
    let isLatestOnes: boolean;

    if (latest === "true") {
        isLatestOnes = true;
    } else {
        isLatestOnes = false;
    }

    if (isBodyFilled) {
        sendErrorMessage({ response, statusCode: 400 });
    } else {
        try {
            if (LimitNumber && !isLatestOnes) {
                const documents: ModelsAllowed[] | unknown = await Model.find({}).limit(LimitNumber);

                if (documents) {
                    sendSuccessMessage({ response, statusCode: 200, data: documents as ModelsAllowed | ModelsAllowed[] });
                } else {
                    sendErrorMessage({ response, statusCode: 404, resource: resourceName });
                }

            } else if (isLatestOnes) {

                if(LimitNumber) {
                    const documents: ModelsAllowed[] | unknown = await Model.find({}).sort({createdAt: -1}).limit(LimitNumber);
                    if(documents) {
                        sendSuccessMessage({ response, statusCode: 200, data: documents as ModelsAllowed[]});
                    } else {
                        sendErrorMessage({ response, statusCode: 404, resource: resourceName }); 
                    }

                } else {
                    const documents: ModelsAllowed[] | unknown = await Model.find({}).sort({createdAt: -1});
                    if(documents) {
                        sendSuccessMessage({ response, statusCode: 200, data: documents as ModelsAllowed[]});
                    } else {
                        sendErrorMessage({ response, statusCode: 404, resource: resourceName });   
                    }
                }

            } else {
                const documents: ModelsAllowed[] = await Model.find({});
                sendSuccessMessage({ response, statusCode: 200, data: documents });
            }
        } catch {
            sendErrorMessage({ response, statusCode: 404, resource: resourceName });
        }
    }
};

