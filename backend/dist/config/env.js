"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsEndpointName = exports.port = exports.databaseUri = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
exports.databaseUri = env.DATABASE_URI;
exports.port = Number(env.PORT) || 8000;
exports.productsEndpointName = env.PRODUCTS_ENDPOINT_NAME || "products";
