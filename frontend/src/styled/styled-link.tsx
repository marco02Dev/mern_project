import { ReactElement, useContext } from "react";
import { StyledText } from "./styled-text";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { AllowedTextTags } from "../config/styled-text.config";

type LinkWrapperProps = {
    $color: string,
    $hoverColor: string,
    $backgroundColor?: string,
    $padding?: string
}

const LinkWrapper = styled(Link)<LinkWrapperProps>`
    color: ${({$color}) => $color};
    background-color: ${({$backgroundColor}) => $backgroundColor ? $backgroundColor : 'unset'};
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    padding: ${({$padding}) => $padding ? $padding : 'unset'}
    &:hover {
        color: ${({$hoverColor}) => $hoverColor}
    };
    span {
        color: inherit;
    }
`;

type StyledLinkProps = {
    content: string,
    to: string,
    tag?: AllowedTextTags,
    size?: string,
    fontWeight?: string,
    backgroundColor?: string
    color?: string,
    padding?: string
}

export const StyledLink = ({content, to, tag, size, fontWeight, backgroundColor, color, padding}: StyledLinkProps): ReactElement => {

    const ThemeModeValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const {mode} = ThemeModeValue;

    const defaultTag: AllowedTextTags = tag ? tag : "span";
    let colorMode: string = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;
    if(color) {
        colorMode = color;
    }
    const hoverColor: string = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;

    return <LinkWrapper 
            $color={colorMode} 
            $hoverColor={hoverColor} 
            to={to} 
            $backgroundColor={backgroundColor}
            $padding={padding}
        >
        <StyledText 
            tag={defaultTag}
            content={content}
            size={size}
            fontWeight={fontWeight}
            largeParagraph
            
        />
    </LinkWrapper>    
}
