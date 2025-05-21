/**
 * Checks if a session cookie (`connect.sid`) is present in the document's cookies.
 *
 * This function looks for a cookie named `connect.sid` to determine if a user session exists.
 * It's useful for basic client-side session validation.
 *
 * @returns {boolean} `true` if the session cookie is found, otherwise `false`.
 *
 * @example
 * const isAuthenticated = checkSession(); // returns true or false
*/

export const checkSession = (): boolean => {
    const sid: string = document.cookie.split('; ').find(row => row.startsWith('connect.sid='));

    if (sid) {
        return true
    }

    return false;
};
