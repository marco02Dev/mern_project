/**
 * Environment configuration variables used in the application.
 *
 * These variables are sourced from the `.env` file via Vite's `import.meta.env` and are used
 * to manage different settings based on the environment (e.g., development, production).
 *
 * - `devolopmentApiEndpoint` stores the endpoint for the development environment (VITE_DEV_ENDPOINT).
 * - `isProduction` is a boolean that checks if the environment is production (based on `VITE_ENV`).
 * - `cookieYesID` contains the unique ID for the CookieYes service (VITE_COOKIEYES_ID).
 * - `isRender` is a boolean indicating whether the application is running in a render environment (based on `VITE_RENDER`).
 *
 * @constant {string} devolopmentApiEndpoint - The API endpoint for development, fetched from `VITE_DEV_ENDPOINT`.
 * @constant {boolean} isProduction - `true` if the environment is production, `false` otherwise.
 * @constant {string} cookieYesID - The unique ID used for CookieYes integration, fetched from `VITE_COOKIEYES_ID`.
 * @constant {boolean} isRender - `true` if the application is running in a render environment, `false` otherwise.
 * 
 * @example
 * // Accessing the development API endpoint
 * console.log(devolopmentApiEndpoint);
*/

export const devolopmentApiEndpoint: string = import.meta.env.VITE_DEV_ENDPOINT;
export const isProduction: boolean = import.meta.env.VITE_ENV !== "development";
export const cookieYesID: string = import.meta.env.VITE_COOKIEYES_ID;
export const iubendaPolicyId = import.meta.env.VITE_IUBENDA_POLICY_ID;
export const isRender: boolean = import.meta.env.VITE_RENDER === "true";