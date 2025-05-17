import { frontendUri } from "@config/system/env.config";

export const corsOptions = {
    origin: frontendUri,
    credentials: true,
};