"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProductsEndpoint = void 0;
const server_1 = __importDefault(require("../server"));
const product_1 = __importDefault(require("../models/product"));
const handleProductsEndpoint = () => {
    server_1.default.post('/products', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const product = request.body;
        const { name, price, featuredImageUrl } = product;
        const isMissingData = !name || !price || !featuredImageUrl;
        if (isMissingData) {
            return response.status(400).json({
                success: false,
                message: "Please provide all requested fields"
            });
        }
        const newProduct = new product_1.default(product);
        try {
            yield newProduct.save();
            response.status(201).json({
                success: true,
                data: newProduct
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`Error in create a new product: ${error.message}`);
            }
        }
    }));
};
exports.handleProductsEndpoint = handleProductsEndpoint;
