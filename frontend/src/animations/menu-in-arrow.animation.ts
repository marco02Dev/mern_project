import { css, RuleSet } from "styled-components";

export const removeMiddleLines: RuleSet = css`

    @keyframes removeLineRight {
        0% {
            opacity: 1;
            transform: translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    @keyframes removeLineLeft {
        0% {
            opacity: 1;
            transform: translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-100%);
        }
    }


    div:first-child {
        animation: removeLineLeft 0.5s ease-in-out forwards;
    };
    div:last-child {
        animation: removeLineRight 0.5s ease-in-out forwards;
    }
`;

export const restoreMiddleLines: RuleSet = css`

    @keyframes restoreLineRight {
        0% {
            opacity: 0;
            transform: translateX(100%);
        }
        100% {
            opacity: 1;
            transform: translateX(0%);
        }
    }

    @keyframes restoreLineLeft {
        0% {
            opacity: 0;
            transform: translateX(-100%);
        }
        100% {
            opacity: 1;
            transform: translateX(0%);
        }
    }

    div:first-child {
        animation: restoreLineLeft 0.5s ease-in-out;
    };
    div:last-child {
        animation: restoreLineRight 0.5s ease-in-out;
    }
`;

// Animazioni per le linee
export const rotateLineDown: RuleSet = css`
    transform: rotate(45deg);
    transition: transform 0.3s ease-in-out;
    position: absolute;
`;

export const rotateLineUp: RuleSet = css`
    transform: rotate(-45deg);
    transition: transform 0.3s ease-in-out;
    position: absolute;
`;

export const restoreRotatedLine: RuleSet = css`
    transform: rotate(0deg) translateX(0);
    transition: transform 0.3s ease-in-out;
    position: relative;

`;