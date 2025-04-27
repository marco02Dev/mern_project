import { getThemeModeFromCookie } from "../utils/get-theme-mode-from-cookie";

export const defaultMode: string = getThemeModeFromCookie() || import.meta.env.VITE_DEFAULT_THEME_MODE || "light";