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
    const queryParams: any = request.query;
    const { limit, latest, productsId }: { limit: string, latest: string, productsId: [string] } = queryParams;
    const LimitNumber: number = parseInt(limit);

    const filterConditions: any = {};

    if (productsId && productsId.length > 0) {
        filterConditions._id = { $in: productsId };
    }

    const options: any = {};

    if (LimitNumber) {
        options.limit = LimitNumber;
    }

    if (latest === "true") {
        options.sort = { createdAt: -1 };
    }

    if (isBodyFilled) {
        sendErrorMessage({ response, statusCode: 400 });
    } else {
        try {
            const documents: ModelsAllowed[] | unknown = await Model.find(filterConditions, null, options);

            if (documents) {
                sendSuccessMessage({ response, statusCode: 200, data: documents as ModelsAllowed[] });
            } else {
                sendErrorMessage({ response, statusCode: 404, resource: resourceName });
            }
        } catch {
            sendErrorMessage({ response, statusCode: 404, resource: resourceName });
        }
    }
};
