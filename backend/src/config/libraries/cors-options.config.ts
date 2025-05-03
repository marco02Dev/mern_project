import { frontendUri } from "../system/env.config";

export const corsOptions = {
    origin: frontendUri,
    credentials: true,
};