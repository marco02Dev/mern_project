import { RuleSet, css, keyframes } from "styled-components";
import Keyframes from "styled-components/dist/models/Keyframes";

const revealLines: Keyframes = keyframes`
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0%);        
    }
`;

const moveWholeContainerOut: Keyframes = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);        
    }
`;

export const revealHiddenElements: RuleSet<{$hasLocationChanged: boolean}> = css<{$hasLocationChanged: boolean}>`
    opacity: ${({$hasLocationChanged}) => $hasLocationChanged ? "1" : "0"};    
    z-index: ${({$hasLocationChanged}) => $hasLocationChanged ? "2000" : "0"};
`;

export const revealLinesAnimation: RuleSet = css`
    animation: ${revealLines} 600ms ease-in-out forwards;
`;

export const revealLinesAnimationDelayedFirst: RuleSet = css`
    animation: ${revealLines} 600ms ease-in-out 100ms forwards;
`;

export const revealLinesAnimationDelayedSecond: RuleSet = css`
    animation: ${revealLines} 600ms ease-in-out 200ms forwards;
`;

export const moveWholeContainerOutAnimation: RuleSet = css`
    animation: ${moveWholeContainerOut} 500ms ease-in-out 900ms forwards;
`;
