/**
 * Retrieves the user's theme preference (e.g., "light" or "dark") from the `themeMode` cookie.
 *
 * This function parses `document.cookie` to locate a cookie named `themeMode`
 * and returns its value if found. If the cookie does not exist, it returns `null`.
 *
 * @returns {string | null} The theme mode from the cookie or `null` if not found.
 *
 * @example
 * const theme = getThemeModeFromCookie();
 * console.log(theme); // "dark" | "light" | null
*/

export const getThemeModeFromCookie = (): string | null => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('themeMode='))
        ?.split('=')[1];
    return cookieValue ?? null;
};