import { RuleSet, css } from "styled-components";

export const buttonHoverAnimation: RuleSet<{$hoverColor: string, $content: string, $size: string}> = css<{$hoverColor: string, $content: string, $size: string}>`
    &::after {
        content: "${({ $content }) => $content}";
        font-size: clamp(2vh, 0.8vh + 1vw, 100vw);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ $hoverColor }) => $hoverColor};
        clip-path: inset(0 100% 0 0);
        transition: clip-path 0.3s ease-in-out;
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