export const getSystemThemePreference = (): string | null => {
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        return darkModeQuery.matches ? "dark" : "light";
    }
    return null;
};