import { MouseEventHandler, ReactElement } from "react";
import { FC } from "react";
import { StyledText } from "./StyledText";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { AllowedTextTags } from "../../config/styled-text.config";
import { buttonInnerStyles, ButtonInnerStylesProps } from "./StyledButton";
import { sizes } from "../../config/sizes.config";
import { linkHoverAnimation } from "../../animations/styled-link.animation";
import { multiPageAppMode } from "../../config/app.config";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";

type LinkWrapperProps = {
    $color: string,
    $hoverColor: string,
    $padding?: string,
    $button?: boolean,
    $afterHeight: string; 
    $size: string;
    $logo?: boolean;
    $absolute?: boolean;
    $action?: boolean;
    $inactive?: boolean;
} & ButtonInnerStylesProps;

const wrapperStyles = css<LinkWrapperProps>`
    color: ${({$color}) => $color};
    display: inline-block;
    cursor: ${({$inactive}) => $inactive ? "unset" : "pointer"};
    pointer-events: ${({$inactive}) => $inactive ? "none" : "auto"};
    text-decoration: none;
    overflow-x: hidden;
    scrollbar-width: none;
    position: ${({$absolute}) => $absolute ? "absolute" : "relative"};
    ${({$absolute}) => $absolute ? css`
        bottom: 0;
        left: 0;
        top: 0;
    ` : ""}
    
    ${({$button}) => $button && buttonInnerStyles}
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

    ${({$action}) => $action && `border-width: ${sizes.heights.verySmall} !important;`}
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
    inactive?: boolean,
    onClickFunction?: MouseEventHandler,
    onMouseOverFunction?: MouseEventHandler,
    onMouseLeaveFunction?: MouseEventHandler,
    className?: string
}

export const StyledLink: FC<StyledLinkProps> = ({
    content, 
    to, 
    tag, 
    size, 
    fontWeight, 
    backgroundColor, 
    color, 
    padding, 
    button, 
    border, 
    logo, 
    absolute, 
    action, 
    inactive,
    onClickFunction,
    onMouseOverFunction,
    onMouseLeaveFunction
}: StyledLinkProps): ReactElement => {
    const { textColor, borderColor, hoverColor }: ThemeColors = useThemeColors();
    const defaultTag: AllowedTextTags = tag ? tag : "span";
    let colorMode: string = textColor;
    let islogoHover: string = logo && absolute ? hoverColor : "";

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
        $inactive={inactive}
        tabIndex={inactive ? -1 : 0}
        onClick={onClickFunction ? onClickFunction : (e) => {
            if (inactive) {
            e.preventDefault();
            }
        }}
        onMouseOver={onMouseOverFunction ? onMouseOverFunction : undefined} 
        onMouseLeave={onMouseLeaveFunction ? onMouseLeaveFunction : undefined} 
        reloadDocument={multiPageAppMode}
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
