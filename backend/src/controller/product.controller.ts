import { Controller, ProductParams } from "../types/controller.type";
import Product, {ProductSchema} from "../models/product.model";
import { getAllDocumentsByModel } from "../queries/get-all-documents-by-model";
import { createNewDocumentByModel } from "../queries/create-new-document-by-model";
import { deleteDocumentByModel } from "../queries/delete-document-by-model";
import { updateDocumentByModel } from "../queries/update-document-by-model";
import { getDocumentsByCategory } from "../queries/get-documents-by-category";
import { Request } from "express";

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