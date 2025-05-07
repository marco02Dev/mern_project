import { useContext } from "react";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/ThemeModeProvider";
import { colors } from "../config/colors.config";

export type ThemeColors = {
    textColor: string,
    backgroundColor: string,
    backgroundColorSecondary: string
    borderColor: string,
    hoverColor: string
}

type useThemeColorsOptions = {
    colorsInverted?: boolean
}

export const useThemeColors = ({ colorsInverted }: useThemeColorsOptions = {}): ThemeColors => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const themeModeToUse : string = colorsInverted ? "light" : "dark";

    return {
        textColor: mode === themeModeToUse ? colors.dark.textColor : colors.light.textColor,
        backgroundColor: mode === themeModeToUse  ? colors.dark.backgroundColor : colors.light.backgroundColor,
        backgroundColorSecondary: mode === themeModeToUse ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary,
        borderColor: mode === themeModeToUse ? colors.dark.textColor : colors.light.textColor, 
        hoverColor: mode === themeModeToUse ? colors.dark.hoverColor : colors.light.hoverColor
    };
};
