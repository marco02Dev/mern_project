import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { colors } from "../../config/colors.config";

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

type useThemeColorsOptions = {
    invertColors?: boolean | Partial<Record<keyof ThemeColors, boolean>>;
};
  

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
  
  