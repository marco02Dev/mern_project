import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export const node_env = env.NODE_ENV || "dev";
export const multiPageAppMode = env.MPA_MODE || false;

export const databaseUri = env.DATABASE_URI;
export const secret = env.SECRET;
export const authorizedIp = env.AUTHORIZED_IP;

export const frontendUri = env.FRONT_END_URI;
export const port: number = Number(env.PORT) || 8000;

export const sessionEndpointName: string = env.SESSION_ENDPOINT_NAME || "session-init";
export const productsEndpointName: string = env.PRODUCTS_ENDPOINT_NAME || "products";
export const usersEndpointName: string = env.USERS_ENDPOINT_NAME || 'users';
export const contactEndpointName: string = env.CONTACT_ENDPOINT_NAME || "contact";

export const transporterData: {service: string, user: string | undefined, password: string | undefined} = {
    service: env.TRANSPORTER_SERVICE || "gmail",
    user: env.TRANSPORTER_USER,
    password: env.TRANSPORTER_PASSWORD
}
