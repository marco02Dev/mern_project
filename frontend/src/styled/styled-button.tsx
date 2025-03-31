import { ReactElement, useContext } from "react";
import { StyledLink } from "./styled-link";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";
import { sizes } from "../config/sizes.config";

type StyledButtonProps = {
    content: string,
    to: string,
}

export const StyledButton = ({content, to }: StyledButtonProps): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext)
    const backGroundColor: string = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const color: string = mode === 'dark' ? colors.light.textColor : colors.dark.textColor;

    return <StyledLink 
        content={content}
        to={to}
        backgroundColor={backGroundColor}
        color={color}
        padding={sizes.spaces.small}
    />
}