import { ReactElement, useContext } from "react";
import { FC } from "react";
import { StyledText } from "./StyledText";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "../../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { AllowedTextTags } from "../../config/styled-text.config";
import { sizes } from "../../config/sizes.config";
import { buttonHoverAnimation } from "../../animations/styled-button.animation";
import { linkHoverAnimation } from "../../animations/styled-link.animation";
interface LinkWrapperProps {
    $color: string,
    $hoverColor: string,
    $backgroundColor?: string,
    $padding?: string,
    $button?: boolean,
    $afterHeight: string; 
    $border?: boolean;
    $borderColor?: string;
    $content: string;
    $size: string;
    $logo?: boolean;
    $absolute?: boolean;
    $action?: boolean;
}

const wrapperStyles = css<LinkWrapperProps>`
    color: ${({$color}) => $color};
    background-color: ${({$backgroundColor}) => $backgroundColor ? $backgroundColor : 'unset'};
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    overflow-x: hidden;
    scrollbar-width: none;
    position: ${({$absolute}) => $absolute ? "absolute" : "relative"};
    ${({$absolute}) => $absolute ? css`
        bottom: 0;
        left: 0;
        top: 0;
    ` : ""}
    

    ${({ $backgroundColor, $content}) => $backgroundColor && $content ? buttonHoverAnimation : ""};


    ${({$padding, $border, $borderColor}) => {
            if($border) {
                if($padding === "default" ) {
                return css`
                    width: auto;
                    display: flex;
                    span {
                        font-size: 100%;
                        padding-left: clamp(4vh, 1vh + 3vw, 4vh);
                        padding-right: clamp(4vh, 1vh + 3vw, 4vh);
                        padding-top: clamp(2.5vh, 1.5vh + 0.5vw, 5vh);
                        padding-bottom: clamp(2.5vh, 1.5vh + 0.5vw, 5vh);
                    }
                `;
            } else if($borderColor) {
                return css`
                    padding-left: clamp(2vh, 2vh + 0.1vw, 100vw);
                    padding-right: clamp(2vh, 2vh + 0.1vw, 100vw);
                    padding-top: clamp(1vh, 1vh + 0.1vw, 100vw);
                    padding-bottom: clamp(0.5vh, 1vh + 0.1vw, 100vw);

                    ${() => `border: clamp(0.1vh, 0.1vh + 0.1vw, 100vh) solid ${$borderColor} !important;`}
                    
                    span {
                        font-size: 100%;
                    }
                `;
            }
        }
    }};
    border-color: ${({$border, $borderColor}) => $borderColor && $border ? $borderColor : "unset"};
    border-width: ${({$border}) => $border ? sizes.heights.verySmall : 'unset'};
    border-style: ${({$border}) => $border ? 'solid' : 'unset'};
    z-index: 1;

    span {
        color: inherit;
        overflow-x: hidden;

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

        ${({$button, $logo}) => !$button && !$logo ? linkHoverAnimation : ""};
    };    
`;

export const DivWrapper = styled.div<LinkWrapperProps>`
    ${() => wrapperStyles}

    ${({$action}) => $action && "border-width: clamp(0.1vh, 0.1vh + 0.1vw, 100vw) !important;"}
`;

export const LinkWrapper = styled(Link)<LinkWrapperProps>`
    ${() => wrapperStyles}
`;

type StyledLinkProps = {
    content: string,
    to?: string,
    tag?: AllowedTextTags,
    size?: string,
    fontWeight?: string,
    backgroundColor?: string
    color?: string,
    padding?: string,
    button?: boolean,
    border?: boolean,
    logo?: boolean,
    absolute?: boolean,
    action?: boolean,
}

export const StyledLink: FC<StyledLinkProps> = ({content, to, tag, size, fontWeight, backgroundColor, color, padding, button, border, logo, absolute, action}: StyledLinkProps): ReactElement => {

    const ThemeModeValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const {mode} = ThemeModeValue;

    const defaultTag: AllowedTextTags = tag ? tag : "span";

    let colorMode: string = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;
    const hoverColor: string = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
    let islogoHover: string = logo && absolute ? hoverColor : "";
    const borderColor: string = mode === 'dark' ? colors.dark.borderColor : colors.light.textColor;

    if(color) {
        colorMode = color;
    }

    if(action && !to) {
        return <DivWrapper 
        $color={colorMode} 
        $hoverColor={hoverColor} 
        as="div"
        $backgroundColor={backgroundColor}
        $padding={padding}
        $button={button}
        $afterHeight={sizes.heights.verySmall}
        $border={border}
        $borderColor={borderColor}
        $content={content}
        $size={size ? size : sizes.fontSizes.paragraph.medium}
        $logo={logo}
        $absolute={absolute}
        $action={action}
        >
            <StyledText 
            tag={defaultTag}
            content={content}
            size={size}
            fontWeight={fontWeight}
            smallParagraph
            color={islogoHover}   
            lineHeight={sizes.lineHeights.h5}
            />
        </DivWrapper>   
        } else {
        return <LinkWrapper 
        $color={colorMode} 
        $hoverColor={hoverColor} 
        to={to as string} 
        $backgroundColor={backgroundColor}
        $padding={padding}
        $button={button}
        $afterHeight={sizes.heights.verySmall}
        $border={border}
        $borderColor={borderColor}
        $content={content}
        $size={size ? size : sizes.fontSizes.paragraph.medium}
        $logo={logo}
        $absolute={absolute}
        >
            <StyledText 
                tag={defaultTag}
                content={content}
                size={size}
                fontWeight={fontWeight}
                smallParagraph
                color={islogoHover}   
                lineHeight={sizes.lineHeights.h5}
            />
        </LinkWrapper>   
    }
}
