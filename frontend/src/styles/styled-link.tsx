import { ReactElement, useContext } from "react";
import { StyledText } from "./styled-text";
import { Link } from "react-router-dom";
import styled, {css, keyframes} from "styled-components";
import { colors } from "../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { AllowedTextTags } from "../config/styled-text.config";
import { sizes } from "../config/sizes.config";

type LinkWrapperProps = {
    $color: string,
    $hoverColor: string,
    $backgroundColor?: string,
    $padding?: string,
    $button?: boolean,
    $afterHeight: string; 
    $border?: boolean;
    $borderColor?: string;
}

const lineMoveOut = keyframes`
  0% {
    transform: translateX(0);
  };
  100% {
    transform: translateX(100%);
  };
`;

const LineMoveBackIn = keyframes`
  0% {
    transform: translateX(-100%);
  };
  100% {
    transform: translateX(0%);
  };
`;

const LinkWrapper = styled(Link)<LinkWrapperProps>`
    color: ${({$color}) => $color};
    background-color: ${({$backgroundColor}) => $backgroundColor ? $backgroundColor : 'unset'};
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    overflow-x: hidden;
    scrollbar-width: none;
    ${({$padding, $border}) => {
            if($border) {
                if($padding === "default" ) {
                return css`
                    padding-left: 3vh;
                    padding-right: 3vh;
                    padding-top: 4vh;
                    padding-bottom: 4vh;
                `;
            } else {
                return css`
                    padding-left: 2vh;
                    padding-right: 2vh;
                    padding-top: 1vh;
                    padding-bottom: 1vh;
                `;
            }
        }
    }};
    border-color: ${({$border, $borderColor}) => $borderColor && $border ? $borderColor : "unset"};
    border-width: ${({$border}) => $border ? sizes.heights.verySmall : 'unset'};
    border-style: ${({$border}) => $border ? 'solid' : 'unset'};
    position: relative;
    z-index: 1;

    span {
        color: inherit;
        position: relative;
        overflow: hidden;

        ${({$button, $afterHeight, $color}) => !$button &&  css` 
            &::after {
                content: '';
                width: 100%;
                height: ${$afterHeight};
                background-color: ${$color};
                position: absolute;
                bottom: 0;
                left: 0;
                margin-top: ${$afterHeight};
            };
        `};

        &:hover {
            color: ${({$hoverColor}) => $hoverColor};

            ${({$button, $hoverColor}) => !$button && css`
                &::after {
                    animation: ${lineMoveOut} 0.2s ease-in-out, ${LineMoveBackIn} 0.2s ease-in-out 0.2s;
                    background-color: ${$hoverColor};
                }
            `};
        }
    };
`;

type StyledLinkProps = {
    content: string,
    to: string,
    tag?: AllowedTextTags,
    size?: string,
    fontWeight?: string,
    backgroundColor?: string
    color?: string,
    padding?: string,
    button?: boolean,
    border?: boolean
}

export const StyledLink = ({content, to, tag, size, fontWeight, backgroundColor, color, padding, button, border}: StyledLinkProps): ReactElement => {

    const ThemeModeValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const {mode} = ThemeModeValue;

    const defaultTag: AllowedTextTags = tag ? tag : "span";
    let colorMode: string = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;
    if(color) {
        colorMode = color;
    }
    const hoverColor: string = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
    const borderColor: string = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    return <LinkWrapper 
            $color={colorMode} 
            $hoverColor={hoverColor} 
            to={to} 
            $backgroundColor={backgroundColor}
            $padding={padding}
            $button={button}
            $afterHeight={sizes.heights.verySmall}
            $border={border}
            $borderColor={borderColor}
        >
        <StyledText 
            tag={defaultTag}
            content={content}
            size={size}
            fontWeight={fontWeight}
            smallParagraph
            
        />
    </LinkWrapper>    
}
