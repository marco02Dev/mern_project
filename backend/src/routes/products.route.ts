import { Router } from "express";
import { getAllProductsController } from "../controller/product/get-all-products.controller";
import { getProductsByCategoryController } from "../controller/product/get-product-by-category.controller";
import { deleteProductController } from "../controller/product/delete-product.controller";
import { createProductController } from "../controller/product/create-product.controller";
import { updateProductController } from "../controller/product/update-product.controller";
import { getProductsByCategoryAndNameController } from "../controller/product/get-products-by-category-and-name.controller";
import { productsEndpointName } from "../config/system/endpoints.config";
import { checkAuthorizedIp } from "../middlewares/security/check-authorize-ip.middleware";
import { uploadImageController } from "../controller/product.controller";
import { isAdmin } from "../middlewares/security/is-admin.middleware";
import { RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/security/is-authenticated.middleware";
import { uploadConvertedImagesToCloudinary } from "../middlewares/files/upload-product-image-to-cloudinary";
import { uploadProductImagesInRam } from "../middlewares/files/upload-product-image-to-cloudinary";
import { rejectRequestIfHoneyPotIsFilled } from "../middlewares/security/reject-request-if-honey-pot-is-filled.middleware";

/**
 * Router for product-related endpoints.
 * 
 * Public endpoints:
 * - GET all products
 * - GET products by category
 * - GET products by category and product name (ID)
 * 
 * Admin endpoints (secured by authentication, admin role, IP check, and honeypot middleware):
 * - POST create a new product
 * - POST upload product images
 * - PUT update existing product by ID
 * - DELETE remove product by ID
*/

const productsRouter: Router = Router();
const defaultEndpoint: string = `/${productsEndpointName}`;
const endpointWithId: string = `/${productsEndpointName}/:id`;
const endpointWithCategory: string = `/${productsEndpointName}/:category`;
const endpointWithCategoryAndName: string = `/${productsEndpointName}/:category/:_id`;
const endpointPostImage: string = `/${productsEndpointName}/image/:category/:id`;

productsRouter.get(
    //Public
    defaultEndpoint, 
    getAllProductsController
);

productsRouter.get(
    //Public
    endpointWithCategory, 
    getProductsByCategoryController
);

productsRouter.get(
    //Public
    endpointWithCategoryAndName, 
    getProductsByCategoryAndNameController
);

productsRouter.post(
    //Admin (Form)
    defaultEndpoint, 
    rejectRequestIfHoneyPotIsFilled, 
    isAuthenticated, 
    isAdmin, 
    checkAuthorizedIp, 
    createProductController 
);

productsRouter.post(
    //Admin (Form)
    endpointPostImage, 
    rejectRequestIfHoneyPotIsFilled, 
    isAuthenticated, 
    isAdmin, 
    checkAuthorizedIp, 
    uploadProductImagesInRam, 
    uploadConvertedImagesToCloudinary, 
    uploadImageController
); 

productsRouter.put(
    //Admin (Form)
    endpointWithId, 
    rejectRequestIfHoneyPotIsFilled, 
    isAuthenticated, 
    isAdmin, 
    checkAuthorizedIp, 
    updateProductController as unknown as RequestHandler
);

productsRouter.delete(
    //Admin
    endpointWithId, 
    isAuthenticated, 
    isAdmin, 
    checkAuthorizedIp, 
    deleteProductController as unknown as RequestHandler
);

export default productsRouter;
