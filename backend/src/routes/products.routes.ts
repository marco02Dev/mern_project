import { Response, Request, Router } from "express";
import { ProductSchema } from "../models/product.model";
import Product from "../models/product.model";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";
import { isString } from "../utils/is-string";
import { isNumber } from "../utils/is-number";
import { sendSuccessMessage, SendSuccessMessageData } from "../utils/send-success-message";

const productsRouter: Router = Router();

productsRouter.post('/products', async (request: Request, response: Response): Promise<any> => {
    const product: ProductSchema = request.body;

    if(product) {
        const {name, price, featuredImageUrl} = product;
        const isMissingData: boolean = !name || !price || !featuredImageUrl;

        if(isMissingData || !isString(name) || !isNumber(price) || !isString(featuredImageUrl)) {
            console.log("missing something");
            const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 400};
            return sendErrorMessage(sendErrorMessageData);
        } else {
            const newProduct: ProductSchema = new Product(product);
            
            try {
                await newProduct.save();
                const sendSuccessMessageData: SendSuccessMessageData = {response: response, statusCode: 201, resource: "Product", data: newProduct}
                return sendSuccessMessage(sendSuccessMessageData);
            } catch(error) {
                if(error instanceof Error) {
                    console.error(`Error in create a new product: ${error.message}`);
                    const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 500};
                    return sendErrorMessage(sendErrorMessageData);
                }
            }
        }
    } else {
        const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 400};
        return sendErrorMessage(sendErrorMessageData);
    }
}); 

export default productsRouter;
