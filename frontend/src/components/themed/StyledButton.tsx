import { ReactElement, useContext } from "react";
import { StyledLink } from "./StyledLink";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import styled from "styled-components";

type StyledButtonProps = {
    content: string,
    to: string,
    headerElement?: boolean
}

const ButtonWrapper = styled.div<{$headerElement?: boolean}>`
    position: relative;
    display: ${({$headerElement}) => $headerElement ? "flex" : "inline-block"};
`;

const ButtonShadow = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 99%;
    height: 99%;
    bottom: 0;
    z-index: 0;
    bottom: clamp(-0.3vh, -0.3vh + -0.1vw, 100vw);
    right: clamp(-0.3vh, -0.3vh + -0.1vw, 100vw);
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