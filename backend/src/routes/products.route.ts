import { Router } from "express";
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProductsByCategory } from "../controller/product.controller";
import { productsEndpointName } from "../config/env";

const productsRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;
const endpointWithId: string = `/${productsEndpointName}/:id`;
const endpointWithCategory: string = `/${productsEndpointName}/:category`;

productsRouter.get(defaultEndpoint, getAllProducts);
productsRouter.get(endpointWithCategory, getProductsByCategory);
productsRouter.post(defaultEndpoint, createProduct); 
productsRouter.delete(endpointWithId, deleteProduct);
productsRouter.put(endpointWithId, updateProduct);

export default productsRouter;
