import { css, keyframes, RuleSet, } from "styled-components";

const turnCompletlyVisbileText = keyframes`
    0% {
        overflow: hidden;
    }
    100%  {
        overflow: visible;
    }
`;

export const turnCompletlyVisbileTextAnimation = css`
    animation: ${turnCompletlyVisbileText} 1.5s ease-in-out forwards;
`;

export const TextReaveal: RuleSet<{$revealText: boolean, $delayed: string}> = css<{$revealText: boolean, $left?: boolean, $delayed: string }>`

    h1, h2, h3, h4, h5, h6, p, a{
        padding-bottom: 0.9%;
        transform: ${({$left}) => $left ? "translateX(-100%)" : "translateY(100%)"};
        ${({$revealText, $left, $delayed}) => $revealText && css`
            transform: translateY(0) translateX(0);
            transition: transform ${$left ? "1s" : "1s"} ease-in-out ${$delayed};
        `};
    }
`;