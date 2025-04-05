import { css, RuleSet, keyframes } from "styled-components";

export const LineMoveBackIn = keyframes`
  0% {
    transform: translateX(-100%);
  };
  100% {
    transform: translateX(0%);
  };
`;

export const lineMoveOut = keyframes`
  0% {
    transform: translateX(0);
  };
  100% {
    transform: translateX(100%);
  };
`;

export const linkHoverAnimation: RuleSet<{$hoverColor: string, $button: string} | any> = css<{$hoverColor: string, $button: string}>`
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