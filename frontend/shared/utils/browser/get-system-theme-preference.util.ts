/**
 * Retrieves the system's preferred theme (light or dark mode).
 *
 * This function checks the user's system preference for color scheme (light or dark mode) 
 * using the `matchMedia` API and returns the corresponding value.
 * If the preference cannot be determined, it returns `null`.
 *
 * @returns {string | null} The system's theme preference, either "dark", "light", or `null` if undetermined.
 * 
 * @example
 * const themePreference = getSystemThemePreference();
 * console.log(themePreference); // Output: "dark" or "light" or null if not supported
*/

export const getSystemThemePreference = (): string | null => {
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        return darkModeQuery.matches ? "dark" : "light";
    }
    return null;
};