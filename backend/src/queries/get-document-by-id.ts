import { Model } from "mongoose";
import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";

type GetDocumentById<T> = {
    Model: Model<T>; 
    request: Request<{ id: string }, {}, T>; 
    response: Response;
    resourceName: string;
};

export const getDocumentById = async <T>({
    Model,
    request,
    response,
    resourceName
}: GetDocumentById<T>) => {
    const params = request.params;
    const { id }: { id: string } = params;

    try {
        if (id) {
            let document: any = await Model.find({ _id: id });

            if (document.length > 0) {
                sendSuccessMessage({
                    response: response,
                    statusCode: 200,
                    resource: resourceName,
                    data: document
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