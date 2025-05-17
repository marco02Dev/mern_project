import { authorizedIp } from "@config/system/env.config";

/**
 * Utility function primarily used by the `checkAuthorizedIp` middleware.
 * 
 * Retrieves the list of authorized IP addresses from environment configuration.
 * The IPs are expected as a comma-separated string.
 * This function splits the string by commas and trims each IP address.
 * If only one IP is provided (or none), it returns it as a single-element array.
 *
 * @returns {string[]} Array of authorized IP addresses.
 *
 * @example
 * // For authorizedIp = "192.168.1.1, 10.0.0.1"
 * getAuthorizedIps(); // ["192.168.1.1", "10.0.0.1"]
 *
 * @example
 * // For authorizedIp = "127.0.0.1"
 * getAuthorizedIps(); // ["127.0.0.1"]
*/

export const getAuthorizedIps = (): string[] => {
    const ipString = authorizedIp || "";
    return ipString.includes(",") 
    ? ipString.split(",").map(ip => ip.trim()) 
    : [ipString];
};