import { ReactElement, FC } from "react";
import styled from "styled-components";
import { StyledLink } from "./StyledLink";
import { StyledShadow } from "./StyledShadow";
import { styledButtonHoverAnimation } from "../../animations/styled-button.animation";
import { buttonFontSize } from "../../config/sizes.config";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";

type StyledButtonProps = {
    content: string,
    to?: string,
    unsetShadow?: boolean,
    action?: Function,
    courseId?: string,
    type?: string,
    isInactive?: boolean
}

const Wrapper = styled.div<{$unsetShadow?: boolean}>`
    position: relative;
    padding: 0;
    display: ${({$unsetShadow}) => $unsetShadow? "flex" : "inline-block"};
    ${({$unsetShadow}) => !$unsetShadow && styledButtonHoverAnimation};
`;


export const StyledButton: FC<StyledButtonProps> = ({content, to, unsetShadow, action, isInactive}: StyledButtonProps): ReactElement => {
    const { textColor, backgroundColorButton }: ThemeColors = useThemeColors({invertColors: {textColor: true}});

    const handleClick = () => {
        if (action) action();
    };

    return <Wrapper $unsetShadow={unsetShadow} onClick={handleClick} >
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

        {!unsetShadow && <StyledShadow />}

    </Wrapper>
}