import { Controller } from "@custom-types/controller.type";
import { isProductDataInvalid } from "@utils/validation/is-product-data-invalid.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { updateDocumentByModel } from "../../queries/update-document-by-model";
import { ProductParams } from "@custom-types/controller.type";
import { ProductSchema } from "@models/product.model";
import Product from "@models/product.model";

export const updateProductController: Controller<ProductParams, {}, ProductSchema> = async (req, res) => {

    if (isProductDataInvalid(req.body)) {
        sendErrorMessage({ response: res, statusCode: 400 });
        return;
    }

    updateDocumentByModel<ProductSchema>({
        Model: Product,
        request: req,
        response: res,
        resourceName: "Product"
    });
}