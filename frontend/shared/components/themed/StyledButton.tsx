import { ReactElement, FC, MouseEventHandler } from "react";
import styled, { css, RuleSet } from "styled-components";
import { StyledLink } from "./StyledLink";
import { StyledShadow } from "./StyledShadow";
import { styledButtonHoverAnimation, buttonHoverAnimation } from "@shared/animations/styled-button.animation";
import { sizes } from "@shared/config/sizes.config";
import { ThemeColors, useThemeColors } from "@shared/hooks/theme/useThemeColors";

export type ButtonInnerStylesProps = {
    $padding?: string,
    $border?: boolean,
    $content: string,
    $borderColor?: string,
    $backgroundColor?: string,
}

export const buttonInnerStyles: RuleSet<ButtonInnerStylesProps> = css<ButtonInnerStylesProps>`
  ${({ $padding, $border, $borderColor, $backgroundColor, $content }) => {
    return css`
      background-color: ${() => $backgroundColor ? $backgroundColor : 'unset'};
      border-color: ${() => $borderColor && $border ? $borderColor : "unset"};
      border-width: ${() => $border ? sizes.heights.verySmall : 'unset'};
      border-style: ${() => $border ? 'solid' : 'unset'};
      ${() => ($backgroundColor && $content ? buttonHoverAnimation : "")};
      ${() => {
        if ($border) {
          if ($padding === "default") {
            return css`
              width: auto;
              display: flex;

              span {
                font-size: ${() => sizes.fontSizes.button};
                padding-left: clamp(2vh, 1vh + 3vw, 4vh);
                padding-right: clamp(2vh, 1vh + 3vw, 4vh);
                padding-top: clamp(1vh, 1.5vh + 0.5vw, 5vh);
                padding-bottom: clamp(1vh, 1.5vh + 0.5vw, 5vh);
              }
            `;
          } else if ($borderColor) {
            return css`
              padding-left: clamp(1.5vh, 1.5vh + 0.1vw, 100vw);
              padding-right: clamp(1.5vh, 1.5vh + 0.1vw, 100vw);
              padding-top: clamp(0.5vh, 0.8vh + 0.1vw, 100vw);
              padding-bottom: clamp(0.5vh, 0.8vh + 0.1vw, 100vw);

              ${() => `
                border: solid ${$borderColor} !important;
                border-width: ${sizes.heights.verySmall} !important;
              `}

              span {
                font-size: ${() => sizes.fontSizes.button};
              }
            `;
          }
        }
      }}
    `;
  }};


`;

const Wrapper = styled.div<{$unsetShadow?: boolean}>`
    position: relative;
    padding: 0;
    display: ${({$unsetShadow}) => $unsetShadow? "flex" : "inline-block"};
    ${({$unsetShadow}) => !$unsetShadow && styledButtonHoverAnimation};
`;

type StyledButtonProps = {
    content: string,
    to?: string,
    unsetShadow?: boolean,
    action?: MouseEventHandler,
    courseId?: string,
    type?: string,
    isInactive?: boolean,
    reloadDocument?: boolean
}

export const StyledButton: FC<StyledButtonProps> = ({
  content, 
  to, 
  unsetShadow, 
  action, 
  isInactive,
  reloadDocument
}: StyledButtonProps): ReactElement => {
    const { textColor, backgroundColorButton }: ThemeColors = useThemeColors({invertColors: {textColor: true}});

    const handleClick: MouseEventHandler = (event) => {
        if (action) action(event);
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
        border
        action
        inactive={isInactive}
        reloadDocument={reloadDocument}
      />

      {!unsetShadow && <StyledShadow />}

    </Wrapper>
}