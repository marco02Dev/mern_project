import { FC, ReactElement } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { getCurrentYear } from "../../utils/browser/get-current-year.util";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledLink } from "../themed/StyledLink";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";

const FooterWrapper = styled.footer<{$backgroundColor: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    flex-direction: column;
`;

export const Footer: FC = (): ReactElement => {
    const { backgroundColor }: ThemeColors = useThemeColors()
    const year: string = getCurrentYear();

    return <FooterWrapper $backgroundColor={backgroundColor}>

        <StyledSpace small vertical />

        <FadeInWrapper>
            <a href="#" className="cky-banner-element">
                <StyledLink 
                    content="Cookie Preferences" 
                    onClickFunction={(event) => {
                        event.preventDefault();
                    }}
                />
            </a>
        </FadeInWrapper>

        <FadeInWrapper>
            <StyledText
                tag="p" 
                size="p"
                verySmallParagraph
                content={`© ${year} Courses Inc. All rights reserved.`}
            />
        </FadeInWrapper>

        <StyledSpace small vertical />
    </FooterWrapper>
}