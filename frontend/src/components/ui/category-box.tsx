import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { colors } from "../../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/theme-mode.context";
import { StyledText } from "../../styles/styled-text";
import { StyledButton } from "../../styles/styled-button";
import { StyledSpace } from "../../styles/styled-space";
import { sizes } from "../../config/sizes.config";
import tickBlack from "../../images/svg/tick-black.svg";
import tickWhite from "../../images/svg/tick-black.svg";

type BoxProps = {
    $backgroundColor: string,
    $color: string,
    $marginLeft?: string,
    $smallSize?: string
}

const Box = styled.div<BoxProps>`
    background-color: ${({ $backgroundColor }) => $backgroundColor};

    margin-left: ${({ $marginLeft}) => $marginLeft};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    p, h3 {
        color: ${({ $backgroundColor }) => $backgroundColor} !important;  
    };
    div {
        width: 80%;
    };
    div:first-child {
        width: 20%;
        img {
            width: 10vh;
        }
    };
`;

type CategoryBoxProps = {
    title: string,
    description: string,
    to: string,
    marginLeft?: string
}

export const CategoryBox = ({title, description, to, marginLeft}: CategoryBoxProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

    const backgroundColor = mode === 'dark' ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary;
    const textColor = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    return <Box $backgroundColor={backgroundColor} $color={textColor} $marginLeft={marginLeft} $smallSize={sizes.spaces.small}>

        <div>
            <img src={mode === 'dark' ? tickBlack : tickWhite} alt="Checkmark icon" />
        </div>

        <div>
            <StyledSpace medium vertical/>
            <StyledText tag="h3" content={title} size="h6" />
            <StyledSpace small vertical />
            <StyledText tag="p" content={description} smallParagraph />
            <StyledSpace small vertical/>
            <StyledButton content="Discover now" to={to}/>
            <StyledSpace medium vertical/>
        </div>
    </Box>;
};