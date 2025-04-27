import { response, Router } from "express";
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProductsByCategory, getProductsByCategoryAndName } from "../controller/product.controller";
import { productsEndpointName } from "../config/env.config";
import { checkAthorizedIp } from "../middlewares/authorize-ip.middleware";
import { uploadProductImages } from "../middlewares/upload-product-image.middleware";
import { uploadImageController } from "../controller/product.controller";
import { imagesConversionMiddleware } from "../middlewares/upload-product-image.middleware";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware";

const productsRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;
const endpointWithId: string = `/${productsEndpointName}/:id`;
const endpointWithCategory: string = `/${productsEndpointName}/:category`;
const endpointWithCategoryAndName: string = `/${productsEndpointName}/:category/:_id`;
const endpointPostImage: string = `/${productsEndpointName}/image/:category/:id`;

productsRouter.get(defaultEndpoint, getAllProducts);
productsRouter.get(endpointWithCategory, getProductsByCategory);
productsRouter.get(endpointWithCategoryAndName, getProductsByCategoryAndName);

productsRouter.post(defaultEndpoint, isAuthenticated, isAdmin, checkAthorizedIp, createProduct);
productsRouter.post(endpointPostImage, isAuthenticated, isAdmin, checkAthorizedIp, uploadProductImages, imagesConversionMiddleware, uploadImageController); 
productsRouter.delete(endpointWithId, isAuthenticated, isAdmin, checkAthorizedIp, deleteProduct as unknown as RequestHandler);
productsRouter.put(endpointWithId, isAuthenticated, isAdmin, checkAthorizedIp, updateProduct as unknown as RequestHandler);

export default productsRouter;
