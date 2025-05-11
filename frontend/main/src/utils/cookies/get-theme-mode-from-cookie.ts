export const getThemeModeFromCookie = (): string | null => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('themeMode='))
        ?.split('=')[1];
    return cookieValue ?? null;
};