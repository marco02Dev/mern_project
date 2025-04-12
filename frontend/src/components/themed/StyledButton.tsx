import { ReactElement, useContext, FC } from "react";
import { StyledLink } from "./StyledLink";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import styled from "styled-components";
import { styledButtonHoverAnimation } from "../../animations/styled-button.animation";

type StyledButtonProps = {
    content: string,
    to?: string,
    headerElement?: boolean,
    action?: Function,
    courseId?: string,
    type?: string
}

const ButtonWrapper = styled.div<{$headerElement?: boolean}>`
    position: relative;
    padding: 0;
    border: 0;
    display: ${({$headerElement}) => $headerElement ? "flex" : "inline-block"};
    ${({$headerElement}) => !$headerElement && styledButtonHoverAnimation}
`;

const ButtonShadow = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    border-bottom: 0.6vh solid black;
    border-right: 0.6vh solid black;
    clip-path: inset(0.6vh 0% 0% 0.6vh);

`;

export const StyledButton: FC<StyledButtonProps> = ({content, to, headerElement, action, type}: StyledButtonProps): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext)
    const backGroundColor: string = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const color: string = mode === 'dark' ? colors.light.textColor : colors.dark.textColor;
    const shadowColor =  mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    const handleClick = () => {
        if (action) action();
    };

    let as: string;

    if(type === "submit") {
        as = "button";
    } else {
        as = "div";
    }


    return <ButtonWrapper as={as} type={type} $headerElement={headerElement} onClick={handleClick} >
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
            action
            
        />

        {!headerElement && <ButtonShadow $color={shadowColor} />}

    </ButtonWrapper>
}