import { ProductSchema } from "../models/product.model";
import { isNumber } from "./is-number";
import { isString } from "./is-string";

export const isProductDataInvalid = (product: ProductSchema): boolean => {
    if(product) {
        const {name, price, featuredImageUrl} = product;
        const isMissingData: boolean = !name || !price || !featuredImageUrl;
        const isInvalid = isMissingData || !isString(name) || !isNumber(price) || !isString(featuredImageUrl);
        return isInvalid
    } else {
        return true;
    }
}