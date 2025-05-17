import { Controller } from "../../types/controller.type";
import { ProductSchema } from "../../models/product.model";
import { isProductDataInvalid } from "../../utils/is-product-data-invalid.util";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { createNewDocumentByModel } from "../../queries/create-new-document-by-model";
import Product from "../../models/product.model";

export const createProductController: Controller<{}, {}, ProductSchema> = async (req, res) => {
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