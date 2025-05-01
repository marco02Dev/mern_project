import { authorizedIp } from "../config/env.config";

export const getAuthorizedIps = (): string[] => {
    const ipString = authorizedIp || "";
    return ipString.includes(",") 
    ? ipString.split(",").map(ip => ip.trim()) 
    : [ipString];
};