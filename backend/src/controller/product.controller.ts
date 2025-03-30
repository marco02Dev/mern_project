import { Controller, ProductParams } from "../types/controller";
import Product, {ProductSchema} from "../models/product.model";
import { isProductDataInvalid } from "../utils/is-product-data-invalid";
import { sendErrorMessage, SendErrorMessageData } from "../utils/send-error-massage";
import { sendSuccessMessage, SendSuccessMessageData } from "../utils/send-success-message";
import { getAllDocumentsByModel } from "../database/get-all-documents-by-model";
import { createNewDocumentByModel } from "../database/create-new-document-by-model";
import { deleteDocumentByModel } from "../database/delete-document-by-model";
import { Request } from "express";

export const getAllProducts: Controller = async (req, res) => {
    getAllDocumentsByModel<ProductSchema>({
        Model: Product,
        request: req as Request<{}, {}, ProductSchema>,
        response: res,
        resourceName: "Products"
    });
}

export const createProduct: Controller<{}, {}, ProductSchema> = async (req, res) => {
    createNewDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
}

export const deleteProduct: Controller<ProductParams> = async (req, res) => {
    deleteDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
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
                sendErrorMessage({response: res, statusCode: 404, resource: "Product"});
                return;
            }
        }
    }    
}