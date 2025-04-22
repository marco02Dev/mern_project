import { ProductSchema } from "../models/product.model";
import { isNumber } from "./is-number.util";
import { isString } from "./is-string.util";

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