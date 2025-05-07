import { useContext } from "react";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/ThemeModeProvider";
import { colors } from "../config/colors.config";

export type ThemeColors = {
    textColor: string,
    borderColor: string,
    hoverColor: string
}

export const useThemeColors = (): ThemeColors => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

    return {
        textColor: mode === "dark" ? colors.dark.textColor : colors.light.textColor,
        borderColor: mode === "dark" ? colors.dark.textColor : colors.light.textColor, 
        hoverColor: mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor
    };
};
