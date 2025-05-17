import { Model } from "mongoose";
import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";

type GetDocumentsByCategory<T> = {
    Model: Model<T>; 
    request: Request<{ category: string, _id: string }, T>; 
    response: Response;
    resourceName: string;
};

export const getDocumentsByCategoryAndId = async <T>({
    Model,
    request,
    response,
    resourceName
}: GetDocumentsByCategory<T>) => {
    const params = request.params;
    const { category, _id }: { category: string, _id: string } = params;

    try {
        if (category && _id) {
            let documents: any = await Model.find({ category, _id });

            if (documents.length > 0) {
                sendSuccessMessage({
                    response: response,
                    statusCode: 200,
                    resource: resourceName,
                    data: documents
                });
            } else {
                sendErrorMessage({
                    response: response,
                    statusCode: 404,
                    resource: resourceName
                });
            }
        } else {
            sendErrorMessage({
                response: response,
                statusCode: 400,
                resource: resourceName,
            });
        }
    } catch (error) {
        sendErrorMessage({
            response: response,
            statusCode: 500,
            resource: resourceName
        });
    }
};
