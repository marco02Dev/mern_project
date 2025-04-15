"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporterData = exports.contactEndpointName = exports.usersEndpointName = exports.productsEndpointName = exports.port = exports.databaseUri = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
exports.databaseUri = env.DATABASE_URI;
exports.port = Number(env.PORT) || 8000;
exports.productsEndpointName = env.PRODUCTS_ENDPOINT_NAME || "products";
exports.usersEndpointName = env.USERS_ENDPOINT_NAME || 'users';
exports.contactEndpointName = env.CONTACT_ENDPOINT_NAME || "contact";
exports.transporterData = {
    service: env.TRANSPORTER_SERVICE || "gmail",
    user: env.TRANSPORTER_USER,
    password: env.TRANSPORTER_PASSWORD
};
