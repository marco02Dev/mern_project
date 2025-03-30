import { Router } from "express";
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "../controller/product.controller";
import { productsEndpointName } from "../config/env";

const productsRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;
const endpointWithId: string = `/${productsEndpointName}/:id`

productsRouter.get(defaultEndpoint, getAllProducts);
productsRouter.post(defaultEndpoint, createProduct); 
productsRouter.delete(endpointWithId, deleteProduct);
productsRouter.put(endpointWithId, updateProduct);

export default productsRouter;
