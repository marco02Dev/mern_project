import { getSystemThemePreference } from "../utils/browser/get-system-theme-preference.util";
import { getThemeModeFromCookie } from "../utils/cookies/get-theme-mode-from-cookie";

export const defaultMode: string = getThemeModeFromCookie() || getSystemThemePreference() || import.meta.env.VITE_DEFAULT_THEME_MODE || "light";