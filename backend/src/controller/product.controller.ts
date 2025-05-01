import { Controller, ProductParams } from "../types/controller.type";
import Product, {ProductSchema} from "../models/product.model";
import { getAllDocumentsByModel } from "../queries/get-all-documents-by-model";
import { createNewDocumentByModel } from "../queries/create-new-document-by-model";
import { deleteDocumentByModel } from "../queries/delete-document-by-model";
import { updateDocumentByModel } from "../queries/update-document-by-model";
import { getDocumentsByCategory } from "../queries/get-documents-by-category";
import { getDocumentsByCategoryAndId } from "../queries/get-documents-by-category-and-name";
import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { isProductDataInvalid } from "../utils/is-product-data-invalid.util";

export const getAllProducts: Controller = async (req, res) => {
    getAllDocumentsByModel<ProductSchema>({
        Model: Product,
        request: req as Request<{}, {}, ProductSchema>,
        response: res,
        resourceName: "Products"
    });
}

export const getProductsByCategory: Controller = async (req, res) => {
    getDocumentsByCategory<ProductSchema>({
        Model: Product,
        request: req as Request<{category: string}, {}, ProductSchema>,
        response: res,
        resourceName: "Product"
    });
}

export const getProductsByCategoryAndName: Controller = async (req, res) => {
    getDocumentsByCategoryAndId<ProductSchema>({
        Model: Product,
        request: req as Request<{category: string, _id: string}, {}, ProductSchema>,
        response: res,
        resourceName: "Product"
    });
}

export const createProduct: Controller<{}, {}, ProductSchema> = async (req, res) => {
    const clientData: ProductSchema = req.body;

    if (isProductDataInvalid(clientData)) {
        sendErrorMessage({ response: res, statusCode: 400 });
        return;
    }

    await createNewDocumentByModel<ProductSchema>({
        Model: Product,
        clientData,
        response: res,
        resourceName: "Product"
    });
};

export const deleteProduct: Controller<ProductParams> = async (req, res) => {
    deleteDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
}

export const updateProduct: Controller<ProductParams, {}, ProductSchema> = async (req, res) => {

    console.log("This controller was executed")

    updateDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
}


export const uploadImageController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id, category } = req.params;   
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  
    const noFiles =
      !files ||
      (Array.isArray(files) ? files.length === 0 : Object.values(files).every(arr => arr.length === 0));
  
    if (!id || !category || noFiles) {
      sendErrorMessage({ response: res, statusCode: 400 });
    }
  
    sendSuccessMessage({ response: res, statusCode: 200 });
};