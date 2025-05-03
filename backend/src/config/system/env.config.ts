import dotenv from 'dotenv';
import path from "path";

const envPath = path.resolve(process.cwd(), '../.env');
dotenv.config({ path: envPath });
const env = process.env;
const node_env = env.NODE_ENV || "dev";

export const isProduction = node_env === "production";
export const multiPageAppMode = env.MPA_MODE || false;

export const databaseUri = env.DATABASE_URI;
export const secret = env.SECRET;
export const authorizedIp = env.AUTHORIZED_IP;

export const frontendUri = env.FRONT_END_URI;
export const port: number = Number(env.PORT) || 8000;

export const transporterData: {
    service: string, 
    user: string, 
    password: string
} = {
    service: env.TRANSPORTER_SERVICE || "gmail",
    user: env.TRANSPORTER_USER!,
    password: env.TRANSPORTER_PASSWORD!
}

export const cloudinaryData: {
    cloud_name: string,
    api_key: string,
    api_secret: string
} = {
    cloud_name: env.CLOUDINARY_CLOUD_NAME!,
    api_key: env.CLOUDINARY_API_KEY!,
    api_secret: env.CLOUDINARY_API_SECRET!,
}
