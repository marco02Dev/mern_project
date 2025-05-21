import { ReactElement, FC } from "react";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { ImageBorderedBox } from "@shared/components/boxes/ImageBorderedBox";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { sizes } from "@shared/config/sizes.config";
import styled from "styled-components";
import { StyledText } from "@shared/components/themed/StyledText";
import { ShortParagraphsLoop } from "@shared/components/loops/ShortParagraphsLoop";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { defaultDelayIncrement } from "@shared/config/animation.config";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";

const MainWrapper = styled.div<{
    $isTablet: boolean
    $isMobile: boolean
}>`
    display: flex;
    flex-direction: ${({$isTablet, $isMobile}) => $isTablet || $isMobile ? "column" : "row"};
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const TextWrapper = styled.div<{$isMobile: boolean, $isTablet: boolean}>`
    width: ${({$isMobile, $isTablet}) => $isMobile || $isTablet ? "100%" : "50%"};
    padding-left: ${({$isMobile}) => $isMobile ? "0%" : sizes.spaces.small};
`;

const PragraphsSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    div {
        width: "100%";
    }
`;

export type ContentSection = {
    title: string,
    content: string,
}

type TextImageSectionProps = {
    img: string,
    secondaryColor?: boolean,
    title: string
    contentSections: ContentSection[],
    oneParagraph?: boolean
}

export const TextImageSection: FC<TextImageSectionProps> = ({ 
    img, 
    secondaryColor, 
    contentSections, 
    title,
    oneParagraph
}: TextImageSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const delay: string = defaultDelayIncrement;

    return (
        <StyledSection secondaryColor={secondaryColor} paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>
            <MainWrapper $isTablet={isTablet} $isMobile={isMobile}>
                <ImageBorderedBox imgSrc={img} />


                <TextWrapper $isTablet={isTablet} $isMobile={isMobile}>
                    {isTablet && <StyledSpace medium vertical />}

                    <TextRevealWrapper left delay={delay}>
                        <StyledText content={title} tag="h2" />
                    </TextRevealWrapper>

                    <StyledSpace small vertical />

                    <PragraphsSectionWrapper>
                        <ShortParagraphsLoop 
                            contentSections={contentSections} 
                            startDelay={sumStringDelays(delay, "200ms")}
                            oneParagraph={oneParagraph}
                        />
                    </PragraphsSectionWrapper>
                </TextWrapper>
            </MainWrapper>
            <StyledSpace small vertical />
        </StyledSection>
    );
};
