import { css, keyframes } from "styled-components";
import Keyframes from "styled-components/dist/models/Keyframes";

const SlideUpDownPageTransitionTitle: Keyframes = keyframes`
    0% {
        transform: translateY(100%);
    };
    40% {
        transform: translateY(0%);
    }
    60% {
        transform: translateY(0%);    
    }
    95% {
        transform: translateY(-100%);
        opacity: 1;
        display: block;
    }
    100% {
        opacity: 0;
        display: none;
    }
`;

export const SlideUpDownPageTransitionTitleAnimation = css`
    animation: ${SlideUpDownPageTransitionTitle} 1000ms ease-in-out forwards 200ms;
`;