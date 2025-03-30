import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export const databaseUri = env.DATABASE_URI;
export const port: number = Number(env.PORT) || 8000;
export const productsEndpointName: string = env.PRODUCTS_ENDPOINT_NAME || "products";