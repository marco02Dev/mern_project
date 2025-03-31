import { ReactElement, useContext } from "react";
import { StyledText } from "../styled/styled-text";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";

const FooterWrapper = styled.footer<{$backgroundColor: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({$backgroundColor}) => $backgroundColor};
`;

export const Footer = (): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext);
    const backgroundColor: string = mode === 'dark' ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary;
    const year: string = String(new Date().getFullYear());

    return <FooterWrapper $backgroundColor={backgroundColor}>
        <StyledText
            tag="p" 
            content={`© ${year} Courses Inc. All rights reserved.`}
        />
    </FooterWrapper>
}