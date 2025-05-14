import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { colors } from "../../config/colors.config";

/**
 * ThemeColors defines the set of color properties used throughout the app's theming system.
 * It also includes the current theme mode (`mode`), which is useful for conditional rendering.
*/

export type ThemeColors = {
  mode: string,
  textColor: string,
  backgroundColor: string,
  backgroundColorSecondary: string,
  backgroundColorButton: string,
  borderColor: string,
  hoverColor: string,
  successMessageColor: string
}

/**
 * Options for the useThemeColors hook.
 * - invertColors: If true, inverts the current theme globally. 
 *   It can also be an object to selectively invert individual theme properties.
*/

type useThemeColorsOptions = {
    invertColors?: boolean | Partial<Record<keyof ThemeColors, boolean>>;
};

/**
 * Custom hook to retrieve theme colors based on the current theme mode from the Redux store.
 * 
 * Supports optional color inversion, either globally or per individual color property.
 * 
 * The returned object also includes the current theme mode (`mode`), useful for conditional rendering.
 *
 * @param {useThemeColorsOptions} [options] - Optional settings to invert theme colors.
 * @returns {ThemeColors} An object containing the theme-based colors and the current theme mode.
 * 
 * @example
 * // Standard usage
 * const { textColor }: ThemeColors = useThemeColors();
 * 
 * // Invert specific color(s)
 * const { textColor, backgroundColorButton }: ThemeColors = useThemeColors({
 *   invertColors: { textColor: true }
 * });
 * 
 * // Invert all theme colors
 * const { borderColor }: ThemeColors = useThemeColors({
 *   invertColors: true
 * });
*/

export const useThemeColors = ({ invertColors = false }: useThemeColorsOptions = {}): ThemeColors => {
    const mode = useSelector((state: RootState) => state.themeMode.mode);
  
    const shouldInvertAll = typeof invertColors === "boolean" ? invertColors : false;
  
    const resolveColor = (
      key: keyof ThemeColors,
      lightValue: string,
      darkValue: string
    ): string => {
      const shouldInvertSpecific = typeof invertColors === "object" ? invertColors[key] : false;
      const shouldInvert = shouldInvertAll || shouldInvertSpecific;
      const effectiveMode = shouldInvert ? (mode === "dark" ? "light" : "dark") : mode;
      return effectiveMode === "dark" ? darkValue : lightValue;
    };
  
    return {
      mode: mode,
      textColor: resolveColor("textColor", colors.light.textColor, colors.dark.textColor),
      backgroundColor: resolveColor("backgroundColor", colors.light.backgroundColor, colors.dark.backgroundColor),
      backgroundColorSecondary: resolveColor("backgroundColorSecondary", colors.light.backgroundColorSecondary, colors.dark.backgroundColorSecondary),
      backgroundColorButton: resolveColor("backgroundColorButton", colors.light.buttonBackgroundColor, colors.dark.buttonBackgroundColor),
      borderColor: resolveColor("borderColor", colors.light.borderColor, colors.dark.borderColor),
      hoverColor: resolveColor("hoverColor", colors.light.hoverColor, colors.dark.hoverColor),
      successMessageColor: resolveColor("successMessageColor", colors.light.successMessage, colors.dark.successMessage)
    };
};
  
  