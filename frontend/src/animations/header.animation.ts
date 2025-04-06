import Keyframes from "styled-components/dist/models/Keyframes";
import { keyframes, css, RuleSet } from "styled-components";

const translateUp: Keyframes = keyframes`
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100%);
    }
`;

const translateDown: Keyframes= keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

export const HideHeaderAnimation: RuleSet = css`
    animation: ${translateUp} 0.5s ease-in-out forwards;
`;

export const RevealHeaderAnimation: RuleSet = css`
    animation: ${translateDown} 0.5s ease-in-out forwards;
`;
