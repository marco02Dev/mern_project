import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { ModelsAllowed } from "../types/models-allowed.type";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { isProductDataInvalid } from "../utils/is-product-data-invalid.util";
import { isUserDataInvalid } from "../utils/is-user-data-invalid.util";
import bcrypt from 'bcrypt';
import { UsersSchema } from "../models/users.model";
import { ProductSchema } from "../models/product.model";

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
    const clientData: UsersSchema | ProductSchema | any = request.body; 

    const isProduct: boolean = resourceName === "Product";
    const isUser: boolean = resourceName === "User";

    if (isProduct) {
        if (isProductDataInvalid(clientData as any)) { 
            sendErrorMessage({ response, statusCode: 400 });
            return;
        }
    } else if(isUser) {
        if (isUserDataInvalid(clientData as any)) {
            sendErrorMessage({ response, statusCode: 400 });
            return;
        }

        const { password }: UsersSchema = clientData;
        const hashedPassword: string = await bcrypt.hash(password, 10);
        clientData['password'] = hashedPassword;
        console.log(clientData);
    } else {
        console.log('Internal server error');
        sendErrorMessage({ response, statusCode: 500 });
    }
    console.log(clientData);

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
