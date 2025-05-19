import { Model } from "mongoose";
import { Request, Response } from "express";
import { sendSuccessMessage } from "@utils/response/send-success-message.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";

type GetDocumentsByCategory<T> = {
    Model: Model<T>; 
    request: Request<{ category: string }, {limit: string}, T>; 
    response: Response;
    resourceName: string;
};

export const getDocumentsByCategory = async <T>({
    Model,
    request,
    response,
    resourceName
}: GetDocumentsByCategory<T>) => {
    const params = request.params;
    const { category }: { category: string } = params;
    const queryParams: any = request.query;
    const { limit }: {limit: string} = queryParams;

    try {
        if (category) {
            let documents: any;
            
            if(limit) {
                documents = await Model.find({ category }).limit(Number(limit));
            } else {
                documents = await Model.find({ category });
            }

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
