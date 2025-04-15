import { frontendUri } from "./env.config";

export const corsOptions = {
    origin: frontendUri,
    credentials: true,
};