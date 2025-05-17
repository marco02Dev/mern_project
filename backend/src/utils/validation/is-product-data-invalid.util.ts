import { ProductSchema } from "@models/product.model";
import { isNumber } from "@utils/validation/is-number.util";
import { isString } from "@utils/validation/is-string.util";

/**
 * Utility function mainly designed for controllers related to courses/products.
 * It checks whether the provided product data is valid.
 *
 * The function validates that the product object contains non-empty `name`, `price`, and `category` fields,
 * and ensures that `name` and `category` are strings and `price` is a number.
 *
 * @param {ProductSchema} product - The product data object to validate.
 * @returns {boolean} Returns `true` if the product data is invalid (missing fields or incorrect types), otherwise `false`.
 *
 * @example
 * const product = { name: "Course 1", price: 50, category: "programming" };
 * isProductDataInvalid(product); // returns false
 *
 * const invalidProduct = { name: "", price: "free", category: null };
 * isProductDataInvalid(invalidProduct); // returns true
*/

export const isProductDataInvalid = (product: ProductSchema): boolean => {
    if(product) {
        const {name, price, category} = product;
        const isMissingData: boolean = !name || !price || !category;
        const isInvalid = isMissingData || !isString(name) || !isNumber(price) || !isString(category);
        return isInvalid
    } else {
        return true;
    }
}