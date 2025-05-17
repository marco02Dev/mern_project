import { Controller } from "@custom-types/controller.type";
import { ProductParams } from "@custom-types/controller.type";
import { deleteDocumentByModel } from "../../queries/delete-document-by-model";
import { ProductSchema } from "@models/product.model";
import Product from "@models/product.model";

export const deleteProductController: Controller<ProductParams> = async (req, res) => {
    deleteDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
}