import { ReactElement, FC } from "react";
import { StyledLink } from "./StyledLink";
import styled from "styled-components";
import { styledButtonHoverAnimation } from "../../animations/styled-button.animation";
import { buttonFontSize } from "../../config/sizes.config";
import { ThemeColors, useThemeColors } from "../../hooks/useThemeColors";

type StyledButtonProps = {
    content: string,
    to?: string,
    unsetShadow?: boolean,
    action?: Function,
    courseId?: string,
    type?: string,
    isInactive?: boolean
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

export const StyledButton: FC<StyledButtonProps> = ({content, to, unsetShadow, action, isInactive}: StyledButtonProps): ReactElement => {
    const { textColor, backgroundColorButton, borderColor }: ThemeColors = useThemeColors({invertColors: {textColor: true}});

    const handleClick = () => {
        if (action) action();
    };

    return <ButtonWrapper $unsetShadow={unsetShadow} onClick={handleClick} >
        <StyledLink 
            content={content}
            to={to}
            backgroundColor={backgroundColorButton}
            color={textColor}
            padding={unsetShadow? 'unsetShadowElement' : "default"}
            fontWeight={'700'}
            button
            size={buttonFontSize}
            border
            action
            inactive={isInactive}
        />

        {!unsetShadow && <ButtonShadow $color={borderColor} />}

    </ButtonWrapper>
}