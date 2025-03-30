import { Controller, ProductParams } from "../types/controller";
import Product, {ProductSchema} from "../models/product.model";
import { isProductDataInvalid } from "../utils/is-product-data-invalid";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";
import { sendSuccessMessage, SendSuccessMessageData } from "../utils/send-success-message";

export const getAllProducts: Controller = async (req, res) => {

    const isBodyFilled: boolean = Object.keys(req.body).length > 0;

    if(isBodyFilled) {
        const sendErrorMessageData: SendErrorMessageData = {response: res, statusCode: 400};
        sendErrorMessage(sendErrorMessageData);  
    } else {
        try {
            const products: ProductSchema[] = await Product.find({});
            const sendSuccessMessageData: SendSuccessMessageData = {
                response: res,
                statusCode: 200,
                data: products
            }
            sendSuccessMessage(sendSuccessMessageData)
        } catch {
            const sendErrorMessageData: SendErrorMessageData = {
                response: res,
                statusCode: 404,
                resource: 'Products'
            }
            sendErrorMessage(sendErrorMessageData);
        }    
    }
}

export const createProduct: Controller<ProductParams, {}, ProductSchema> = async (req, res) => {
    const product: ProductSchema = req.body;

    if(isProductDataInvalid(product)) {
        const sendErrorMessageData: SendErrorMessageData = {response: res, statusCode: 400};
        sendErrorMessage(sendErrorMessageData);
        return;
    } else {
        const newProduct: ProductSchema = new Product(product);
        
        try {
            await newProduct.save();
            const sendSuccessMessageData: SendSuccessMessageData = {response: res, statusCode: 201, resource: "Product", data: newProduct}
            sendSuccessMessage(sendSuccessMessageData);
            return;
        } catch(error) {
            if(error instanceof Error) {
                console.error(`Error in create a new product: ${error.message}`);
                const sendErrorMessageData: SendErrorMessageData = {response: res, statusCode: 500};
                sendErrorMessage(sendErrorMessageData);
                return;
            }
        }
    }
}

export const deleteProduct: Controller<ProductParams> = async (req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        const sendSuccessMessageData: SendSuccessMessageData = {
            response: res,
            statusCode: 200,
            resource: "Product",
            deleteResource: true
        }
        sendSuccessMessage(sendSuccessMessageData)
    } catch(erorr) {
        const sendErrorMessageData: SendErrorMessageData = {
            response: res,
            statusCode: 404,
            resource: 'Product'
        }
        sendErrorMessage(sendErrorMessageData);
    }
}

export const updateProduct: Controller<ProductParams, {}, ProductSchema> = async (req, res) => {
    const {id} = req.params;
    if(id) {
        const product: ProductSchema = req.body;
        if(isProductDataInvalid(product)) {
            const sendErrorMessageData: SendErrorMessageData = {response: res, statusCode: 400};
            sendErrorMessage(sendErrorMessageData);
            return;
        } else {            
            const {name}: ProductSchema = product;

            try {
                const ProductUpdated = await Product.findByIdAndUpdate(id, product, {new: true});
                if(ProductUpdated) {
                    const sendSuccessMessageData: SendSuccessMessageData = {
                        response: res,
                        statusCode: 200,
                        data: ProductUpdated,
                        resource: "Product",
                        updateResource: true
                    }
                    sendSuccessMessage(sendSuccessMessageData);
                    return;
                } 
            } catch {
                console.log(`Product "${name}" not found`);
                const sendErrorMessageData: SendErrorMessageData = {response: res, statusCode: 404, resource: "Product"};
                sendErrorMessage(sendErrorMessageData);
                return;
            }
        }
    }    
}