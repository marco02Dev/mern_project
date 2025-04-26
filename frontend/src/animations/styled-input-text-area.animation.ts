import { RuleSet, css } from "styled-components";

type InputBorderStylesProps = {
    $borderColor: string, 
}

type StyledInpuTextAreaFocusAnimation = {
    $inputOnFocus: boolean,
    $hoverColor: string,
}

export const InputBorderStyles: RuleSet<InputBorderStylesProps> = css<InputBorderStylesProps>`
    border-top: unset;
    border-left: unset;
    border-right: unset;
    border-bottom-width: 0.4vh;
    position: relative;

    &:focus {
        outline: none;
    }
`;


export const styledInpuTextAreaFocusAnimation: RuleSet<StyledInpuTextAreaFocusAnimation> = css<StyledInpuTextAreaFocusAnimation>`
    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: ${({$hoverColor}) => $hoverColor};
        width: 100%;
        clip-path: ${({$inputOnFocus}) => $inputOnFocus ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'};
        transition: clip-path 0.5s ease-in-out;
        height: 0.4vh;
        overflow: hidden;
    }

`;