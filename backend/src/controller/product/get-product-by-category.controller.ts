import { Controller } from "@custom-types/controller.type";
import { Request, Response } from "express";
import { getDocumentsByCategory } from "../../queries/get-documents-by-category";
import { ProductSchema } from "@models/product.model";
import Product from "@models/product.model";

export const getProductsByCategoryController: Controller = async (req: Request, res: Response) => {
    getDocumentsByCategory<ProductSchema>({
        Model: Product,
        request: req as Request<{category: string}, {}, ProductSchema>,
        response: res,
        resourceName: "Product"
    });
}