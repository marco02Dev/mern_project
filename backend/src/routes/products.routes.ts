import { Response, Request, Router } from "express";
import { ProductSchema } from "../models/product.model";
import Product from "../models/product.model";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";

const productsRouter = Router();

productsRouter.post('/products', async (request: Request, response: Response): Promise<any> => {
    const product: ProductSchema = request.body;

    if(product) {
        const {name, price, featuredImageUrl} = product;
        const isMissingData: boolean = !name || !price || !featuredImageUrl;

        if(isMissingData) {
            const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 500};
            return sendErrorMessage(sendErrorMessageData);
        }

        const newProduct = new Product(product);

        try {
            await newProduct.save();
            response.status(201).json({
                success: true,
                data: newProduct
            });
        } catch(error) {
            if(error instanceof Error) {
                console.error(`Error in create a new product: ${error.message}`);
            }

        }
    } else {
        const sendErrorMessageData: SendErrorMessageData = {response: response, statusCode: 500};
        return sendErrorMessage(sendErrorMessageData);
    }
}); 

export default productsRouter;
