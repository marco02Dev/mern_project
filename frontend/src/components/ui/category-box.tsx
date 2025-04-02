import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { colors } from "../../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/theme-mode.context";
import { StyledText } from "../../styles/styled-text";
import { StyledButton } from "../../styles/styled-button";

type BoxProps = {
    $backgroundColor: string,
    $color: string,
    $marginLeft?: string
}

const Box = styled.div<BoxProps>`
    background-color: ${({ $color }) => $color};
    color: ${({ $backgroundColor }) => $backgroundColor};
    margin-left: ${({ $marginLeft}) => $marginLeft};
    p, h3 {
        color: ${({ $backgroundColor }) => $backgroundColor} !important;  
    }
`;

type CategoryBoxProps = {
    title: string,
    description: string,
    to: string,
    marginLeft?: string
}

export const CategoryBox = ({title, description, to, marginLeft}: CategoryBoxProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

    const backgroundColor = mode === 'dark' ? colors.dark.backgroundColor : colors.light.backgroundColor;
    const textColor = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    return <Box $backgroundColor={backgroundColor} $color={textColor} $marginLeft={marginLeft}>
        <StyledText tag="h3" content={title} />
        <StyledText tag="p" content={description} />

        <StyledButton content="Discover now" to={to}/>
    </Box>;
};