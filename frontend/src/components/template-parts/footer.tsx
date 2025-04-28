import { FC, ReactElement, useContext } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { getCurrentYear } from "../../utils/browser/get-current-year.util";

const FooterWrapper = styled.footer<{$backgroundColor: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    flex-direction: column;
`;

export const Footer: FC = (): ReactElement => {

    const {mode}: ThemeModeContextProps = useContext(ThemeModeContext);
    const backgroundColor: string = mode === 'dark' ? colors.dark.backgroundColor : colors.light.backgroundColor;
    const year: string = getCurrentYear();

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