import { Response, Request, Router } from "express";
import { ProductSchema } from "../models/product.model";
import Product from "../models/product.model";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";
import { isString } from "../utils/is-string";
import { isNumber } from "../utils/is-number";
import { sendSuccessMessage, SendSuccessMessageData } from "../utils/send-success-message";

const productsRouter: Router = Router();

productsRouter.get("/products", async (request: Request, response: Response): Promise<any> => {
    try {
        const products: ProductSchema[] = await Product.find({});
        const sendSuccessMessageData: SendSuccessMessageData = {
            response: response,
            statusCode: 200,
            data: products
        }
        sendSuccessMessage(sendSuccessMessageData)
    } catch {
        const sendErrorMessageData: SendErrorMessageData = {
            response: response,
            statusCode: 404,
            resource: 'Products'
        }
        sendErrorMessage(sendErrorMessageData);
    }
})

productsRouter.post('/products', async (request: Request, response: Response): Promise<any> => {
    const product: ProductSchema = request.body;

    if(product) {
        const {name, price, featuredImageUrl} = product;
        const isMissingData: boolean = !name || !price || !featuredImageUrl;

        if(isMissingData || !isString(name) || !isNumber(price) || !isString(featuredImageUrl)) {
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

productsRouter.delete("/products/:id", async (request: Request<{id: string}>, response: Response): Promise<any> => {
    const {id}: {id: string} = request.params;
    
    try {
        await Product.findByIdAndDelete(id);
        const sendSuccessMessageData: SendSuccessMessageData = {
            response: response,
            statusCode: 200,
            resource: "Product",
            deleteResource: true
        }
        sendSuccessMessage(sendSuccessMessageData)
    } catch(erorr) {
        const sendErrorMessageData: SendErrorMessageData = {
            response: response,
            statusCode: 404,
            resource: 'Product'
        }
        sendErrorMessage(sendErrorMessageData);
    }
});

productsRouter.put("/products/:id", async (request: Request<{id: string}>, response: Response): Promise<any> => {
    const {id}: {id: string} = request.params;
});

export default productsRouter;
