import { FC, ReactElement } from "react";
import { StyledText } from "@shared/components/themed/StyledText";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import styled from "styled-components";
import { getCurrentYear } from "@shared/utils/system/get-current-year.util";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { FooterLinksLoop } from "@shared/components/loops/FooterLinksLoop";
import { ThemeColors, useThemeColors } from "@shared/hooks/theme/useThemeColors";

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

        <FooterLinksLoop />

        <StyledSpace verySmall vertical />

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