import { RuleSet, css, keyframes } from "styled-components";
import Keyframes from "styled-components/dist/models/Keyframes";
import { buttonFontSize } from "@shared/config/sizes.config";

const animationDuration: string = "0.3s";

type buttonHoverAnimationProps = {
    $hoverColor: string, 
    $size?: string    
}

export const buttonHoverAnimation: RuleSet<buttonHoverAnimationProps> = css<buttonHoverAnimationProps>`
    &::after {
        content: "";
        font-size: ${() => buttonFontSize};
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ $hoverColor }) => $hoverColor};
        clip-path: inset(0 100% 0 0);
        transition: clip-path ${() => animationDuration} ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;
    }

    &:hover {
        &::after {
            clip-path: inset(0 0 0 0);
        }
    }
`;

const removeBorder: Keyframes = keyframes`
    0% {
        border-width: 0.6vh;
    };
    100% {
        border-width: 0vh;
    }
`;

const removealBorder: Keyframes = keyframes`
    0% {
        border-width: 0vh;
    };
    100% {
        border-width: 0.6vh;
    }
`;


export const styledButtonHoverAnimation: RuleSet = css`
    &:hover {
        div {
            animation: ${removeBorder} ${animationDuration} ease-in-out forwards;
        }
    };
    &:not(:hover) {
        div {
            animation: ${removealBorder} ${animationDuration} ease-in-out forwards;
        }
    }
`;