import { css, RuleSet, keyframes } from "styled-components";
import Keyframes from "styled-components/dist/models/Keyframes";
import { LinkWrapperProps } from "@shared/components/themed/StyledLink";

export const LineMoveBackIn: Keyframes = keyframes`
  0% {
    transform: translateX(-100%);
  };
  100% {
    transform: translateX(0%);
  };
`;

export const lineMoveOut: Keyframes = keyframes`
  0% {
    transform: translateX(0);
  };
  100% {
    transform: translateX(100%);
  };
`;

export const linkHoverAnimation: RuleSet<LinkWrapperProps> = css<LinkWrapperProps>`
  &:hover {
    color: ${({$hoverColor}) => $hoverColor};

    ${({$button, $hoverColor}) => !$button && css`
        &::after {
            animation: ${lineMoveOut} 0.2s ease-in-out, ${LineMoveBackIn} 0.2s ease-in-out 0.2s;
            background-color: ${$hoverColor};
        }
    `};
  }
`;