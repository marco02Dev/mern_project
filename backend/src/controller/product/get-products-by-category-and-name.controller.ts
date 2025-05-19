import { Controller } from "@custom-types/controller.type";
import { getDocumentsByCategoryAndId } from "@utils/queries/get-documents-by-category-and-name";
import { ProductSchema } from "@models/product.model";
import Product from "@models/product.model";
import { Request } from "express";

export const getProductsByCategoryAndNameController: Controller = async (req, res) => {
    getDocumentsByCategoryAndId<ProductSchema>({
        Model: Product,
        request: req as Request<{category: string, _id: string}, {}, ProductSchema>,
        response: res,
        resourceName: "Product"
    });
}