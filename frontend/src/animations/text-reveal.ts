import { css, RuleSet } from "styled-components";

export const TextReaveal: RuleSet<{$revealText: boolean}> = css<{$revealText: boolean, $left?: string}>`
    h1, h2, h3, h4, h5, h6, p, a{
        transform: ${({$left}) => $left ? "translateX(-100%)" : "translateY(100%)"};
        ${({$revealText, $left}) => $revealText && css`
            transform: translateY(0) translateX(0);
            transition: transform ${$left ? "1.5s" : "1s"} ease-in-out;
        `};
    }
`;