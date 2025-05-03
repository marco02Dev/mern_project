import { authorizedIp } from "../config/system/env.config";

export const getAuthorizedIps = (): string[] => {
    const ipString = authorizedIp || "";
    return ipString.includes(",") 
    ? ipString.split(",").map(ip => ip.trim()) 
    : [ipString];
};