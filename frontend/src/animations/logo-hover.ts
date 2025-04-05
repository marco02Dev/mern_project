import { css, RuleSet } from "styled-components";

export const logoHover: RuleSet = css`
    a:last-child {
        clip-path: inset(0 100% 0 0);
        transition: clip-path 0.4s ease-in-out !important;
    }

    &:hover {
        a:last-child {
        clip-path: inset(0 0 0 0);
        }
    }

`;