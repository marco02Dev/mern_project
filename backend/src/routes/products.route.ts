import { Router } from "express";
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProductsByCategory, getProductsByCategoryAndName } from "../controller/product.controller";
import { productsEndpointName } from "../config/env.config";
import { checkAthorizedIp } from "../middlewares/authorize-ip";

const productsRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;
const endpointWithId: string = `/${productsEndpointName}/:id`;
const endpointWithCategory: string = `/${productsEndpointName}/:category`;
const endpointWithCategoryAndName: string = `/${productsEndpointName}/:category/:_id`;

productsRouter.get(defaultEndpoint, getAllProducts);
productsRouter.get(endpointWithCategory, getProductsByCategory);
productsRouter.get(endpointWithCategoryAndName, getProductsByCategoryAndName);

productsRouter.post(defaultEndpoint, checkAthorizedIp, createProduct); 
productsRouter.delete(endpointWithId, checkAthorizedIp, deleteProduct);
productsRouter.put(endpointWithId, checkAthorizedIp, updateProduct);

export default productsRouter;
