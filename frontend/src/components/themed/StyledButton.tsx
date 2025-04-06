import { ReactElement, useContext } from "react";
import { StyledLink } from "./StyledLink";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import styled from "styled-components";
import { styledButtonHoverAnimation } from "../../animations/styled-button.animation";

type StyledButtonProps = {
    content: string,
    to: string,
    headerElement?: boolean
}

const ButtonWrapper = styled.div<{$headerElement?: boolean}>`
    position: relative;
    display: ${({$headerElement}) => $headerElement ? "flex" : "inline-block"};
    ${() => styledButtonHoverAnimation}
`;

const ButtonShadow = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 100%;
    height: 100%;
    bottom: 0;
    z-index: 0;
    bottom: -6%;
    right: -3%;
`;

export const StyledButton = ({content, to, headerElement }: StyledButtonProps): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext)
    const backGroundColor: string = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const color: string = mode === 'dark' ? colors.light.textColor : colors.dark.textColor;
    const shadowColor =  mode === 'dark' ? colors.dark.textColor : colors.light.textColor

    return <ButtonWrapper $headerElement={headerElement}>
        <StyledLink 
            content={content}
            to={to}
            backgroundColor={backGroundColor}
            color={color}
            padding={headerElement ? 'headerElement' : "default"}
            fontWeight={'700'}
            button
            size={"100%"}
            border
        />

        {!headerElement && <ButtonShadow $color={shadowColor} />}

    </ButtonWrapper>
}