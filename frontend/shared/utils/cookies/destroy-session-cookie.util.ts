/**
 * Destroys the `connect.sid` session cookie by setting its expiration date to the past.
 *
 * This function is used to manually log out a user on the client side by removing
 * the session identifier from the browser's cookies.
 *
 * @returns {void}
 *
 * @example
 * destroySessionCookie(); // Logs the user out by invalidating the session cookie
*/

export const destroySessionCookie = (): void => {
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'; 
};
