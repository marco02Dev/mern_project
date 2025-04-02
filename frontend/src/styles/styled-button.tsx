import { ReactElement, useContext } from "react";
import { StyledLink } from "./styled-link";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";
import { sizes } from "../config/sizes.config";
import styled from "styled-components";

type StyledButtonProps = {
    content: string,
    to: string,
    headerElement?: boolean
}

const ButtonWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const ButtonShadow = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 98%;
    height: 98%;
    bottom: 0;
    z-index: 0;
    bottom: clamp(-0.6vh, -0.6vh + -0.1vw, 100vw);
    right: clamp(-0.6vh, -0.6vh + -0.1vw, 100vw);
`;

export const StyledButton = ({content, to, headerElement }: StyledButtonProps): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext)
    const backGroundColor: string = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const color: string = mode === 'dark' ? colors.light.textColor : colors.dark.textColor;
    const shadowColor =  mode === 'dark' ? colors.dark.textColor : colors.light.textColor

    return <ButtonWrapper>
        <StyledLink 
            content={content}
            to={to}
            backgroundColor={backGroundColor}
            color={color}
            padding={headerElement ? 'headerElement' : "default"}
            fontWeight={'700'}
            button
            size={sizes.fontSizes.paragraph.verySmall}
            border
        />

        {!headerElement && <ButtonShadow $color={shadowColor} />}

    </ButtonWrapper>
}