import Keyframes from "styled-components/dist/models/Keyframes";
import { keyframes, css, RuleSet } from "styled-components";

const animationDuration: string = "0.3s";

const removeBorder: Keyframes = keyframes`
    0% {
        bottom: -2%;
        right: -2%;
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
        bottom: -2%;
        right: -2%;
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