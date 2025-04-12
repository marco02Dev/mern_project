import Keyframes from "styled-components/dist/models/Keyframes";
import { keyframes, css, RuleSet } from "styled-components";

const animationDuration: string = "0.3s";

const removeBorder: Keyframes = keyframes`
    0% {
        border-width: 1.5vh;
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
        border-width: 1.5vh;
    }
`;


export const styledBoxHoverAnimation: RuleSet = css`
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