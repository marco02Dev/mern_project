import { ReactElement, useContext, FC } from "react";
import { StyledLink } from "./StyledLink";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import styled from "styled-components";
import { styledButtonHoverAnimation } from "../../animations/styled-button.animation";
import { buttonFontSize } from "../../config/sizes.config";

type StyledButtonProps = {
    content: string,
    to?: string,
    unsetShadow?: boolean,
    action?: Function,
    courseId?: string,
    type?: string
}

const ButtonWrapper = styled.div<{$unsetShadow?: boolean}>`
    position: relative;
    padding: 0;
    display: ${({$unsetShadow}) => $unsetShadow? "flex" : "inline-block"};
    ${({$unsetShadow}) => !$unsetShadow && styledButtonHoverAnimation};
`;

const ButtonShadow = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    border-bottom: 0.6vh solid ${({$color}) => $color};
    border-right: 0.6vh solid ${({$color}) => $color};
    clip-path: inset(0.6vh 0% 0% 0.6vh);
`;

export const StyledButton: FC<StyledButtonProps> = ({content, to, unsetShadow, action}: StyledButtonProps): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext)
    const backGroundColor: string = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const color: string = mode === 'dark' ? colors.light.textColor : colors.dark.textColor;
    const shadowColor =  mode === 'dark' ? colors.dark.borderColor : colors.light.textColor;

    const handleClick = () => {
        if (action) action();
    };

    return <ButtonWrapper $unsetShadow={unsetShadow} onClick={handleClick} >
        <StyledLink 
            content={content}
            to={to}
            backgroundColor={backGroundColor}
            color={color}
            padding={unsetShadow? 'unsetShadowElement' : "default"}
            fontWeight={'700'}
            button
            size={buttonFontSize}
            border
            action
        />

        {!unsetShadow && <ButtonShadow $color={shadowColor} />}

    </ButtonWrapper>
}