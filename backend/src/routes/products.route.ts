import { response, Router } from "express";
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProductsByCategory, getProductsByCategoryAndName } from "../controller/product.controller";
import { productsEndpointName } from "../config/env.config";
import { checkAthorizedIp } from "../middlewares/authorize-ip";
import { uploadProductImages } from "../middlewares/upload-product-image.middleware";
import { uploadImageController } from "../controller/product.controller";
import { imagesConversionMiddleware } from "../middlewares/upload-product-image.middleware";

const productsRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;
const endpointWithId: string = `/${productsEndpointName}/:id`;
const endpointWithCategory: string = `/${productsEndpointName}/:category`;
const endpointWithCategoryAndName: string = `/${productsEndpointName}/:category/:_id`;
const endpointPostImage: string = `/${productsEndpointName}/image/:category/:id`;

productsRouter.get(defaultEndpoint, getAllProducts);
productsRouter.get(endpointWithCategory, getProductsByCategory);
productsRouter.get(endpointWithCategoryAndName, getProductsByCategoryAndName);

productsRouter.post(defaultEndpoint, checkAthorizedIp, createProduct);
productsRouter.post(endpointPostImage, checkAthorizedIp, uploadProductImages, imagesConversionMiddleware, uploadImageController); 
productsRouter.delete(endpointWithId, checkAthorizedIp, deleteProduct);
productsRouter.put(endpointWithId, checkAthorizedIp, updateProduct);

export default productsRouter;
