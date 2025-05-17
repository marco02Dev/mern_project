import { Controller } from "../../types/controller.type";
import { ProductSchema } from "../../models/product.model";
import { getAllDocumentsByModel } from "../../queries/get-all-documents-by-model";
import Product from "../../models/product.model";
import { Request, Response } from "express";

export const getAllProductsController: Controller = async (req: Request, res: Response) => {
    getAllDocumentsByModel<ProductSchema>({
        Model: Product,
        request: req as Request<{}, {}, ProductSchema>,
        response: res,
        resourceName: "Products"
    });
}