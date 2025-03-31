import { Controller, ProductParams } from "../types/controller";
import Product, {ProductSchema} from "../models/product.model";
import { getAllDocumentsByModel } from "../database/get-all-documents-by-model";
import { createNewDocumentByModel } from "../database/create-new-document-by-model";
import { deleteDocumentByModel } from "../database/delete-document-by-model";
import { updateDocumentByModel } from "../database/update-document-by-model";
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
    updateDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
}