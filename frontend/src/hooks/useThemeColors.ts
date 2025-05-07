import { useContext } from "react";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/ThemeModeProvider";
import { colors } from "../config/colors.config";

export type ThemeColors = {
    mode: string,
    textColor: string,
    backgroundColor: string,
    backgroundColorSecondary: string,
    backgroundColorButton: string,
    borderColor: string,
    hoverColor: string
}

type useThemeColorsOptions = {
    invertColors?: boolean | Partial<Record<keyof ThemeColors, boolean>>;
};
  

export const useThemeColors = ({ invertColors = false }: useThemeColorsOptions = {}): ThemeColors => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
  
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
    };
};
  
  