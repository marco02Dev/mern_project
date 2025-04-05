import { ReactElement, useContext } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";

const FooterWrapper = styled.footer<{$backgroundColor: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    flex-direction: column;
`;

export const Footer = (): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext);
    const backgroundColor: string = mode === 'dark' ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary;
    const year: string = String(new Date().getFullYear());

    return <FooterWrapper $backgroundColor={backgroundColor}>

        <StyledSpace small vertical />

        <StyledText
            tag="p" 
            size="p"
            verySmallParagraph
            content={`© ${year} Courses Inc. All rights reserved.`}
        />

        <StyledSpace small vertical />
    </FooterWrapper>
}