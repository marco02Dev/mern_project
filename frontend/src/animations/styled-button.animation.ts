import { RuleSet, css, keyframes } from "styled-components";
import Keyframes from "styled-components/dist/models/Keyframes";

const animationDuration: string = "0.3s";

export const buttonHoverAnimation: RuleSet<{$hoverColor: string, $content: string, $size: string}> = css<{$hoverColor: string, $content: string, $size: string}>`
    &::after {
        content: "${({ $content }) => $content}";
        font-size: 100%;
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
    }

    &:hover {
        &::after {
            clip-path: inset(0 0 0 0);
        }
    }
`;

const removeBorder: Keyframes = keyframes`
    0% {
        bottom: -6%;
        right: -3%;
    };
    100% {
        bottom: 0;
        right: 0;
    }
`;

const removealBorder: Keyframes = keyframes`
    0% {
        bottom: 0%;
        right: 0%;
    };
    100% {
        bottom: -6%;
        right: -3%;
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