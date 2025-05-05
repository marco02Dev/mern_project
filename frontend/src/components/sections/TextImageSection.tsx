import { ReactElement, FC } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { ImageBorderedBox } from "../boxes/ImageBorderedBox";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { StyledText } from "../themed/StyledText";
import { ShortParagraphsLoop } from "../loops/ShortParagraphsLoop";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { defaultDelayIncrement } from "../../config/animation.config";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

const MainWrapper = styled.div<{$isTablet: boolean}>`
    display: flex;
    flex-direction: ${({$isTablet}) => $isTablet ? "column" : "row"};
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const TextWrapper = styled.div<{$isMobile: boolean, $isTablet: boolean}>`
    width: ${({$isMobile, $isTablet}) => $isMobile || $isTablet ? "100%" : "50%"};
    padding-left: ${({$isMobile}) => $isMobile ? "0%" : sizes.spaces.small};
`;

const PragraphsSectionWrapper = styled.div<{$isTablet: boolean}>`
    display: flex;
    flex-direction: ${({$isTablet}) => $isTablet ? "column" : "column"};
    flex-wrap: wrap;
    div {
        width: ${({$isTablet}) => $isTablet ? "50%" : "column"};
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
            <MainWrapper $isTablet={isTablet}>
                {!isMobile && <ImageBorderedBox imgSrc={img} />}
                {isMobile && <StyledSpace large medium />}

                <TextWrapper $isTablet={isTablet} $isMobile={isMobile}>
                    {isTablet && <StyledSpace small medium />}

                    <TextRevealWrapper left delay={delay}>
                        <StyledText content={title} tag="h2" />
                    </TextRevealWrapper>

                    <StyledSpace small vertical />

                    <PragraphsSectionWrapper $isTablet={isTablet}>
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
