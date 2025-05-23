import { Controller } from "@custom-types/controller.type";
import { ProductSchema } from "@models/product.model";
import { isProductDataInvalid } from "@utils/validation/is-product-data-invalid.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { createNewDocumentByModel } from "@utils/queries/create-new-document-by-model";
import Product from "@models/product.model";

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