import { ReactElement, FC } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { ImageBorderedBox } from "../boxes/ImageBorderedBox";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { StyledText } from "../themed/StyledText";
import { ShortParagraphsLoop } from "../loops/ShortParagraphsLoop";

const MainWrapper = styled.div<{$isTablet: boolean}>`
    display: flex;
    flex-direction: ${({$isTablet}) => $isTablet ? "column" : "row"};
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const TextWrapper = styled.div<{$isMobile: boolean}>`
    width: ${({$isMobile}) => $isMobile ? "100%" : "50%"};
`;

export type ContentSection = {
    title: string,
    content: string
}

type TextImageSectionProps = {
    img: string,
    secondaryColor: boolean,
    title: string
    contentSections: ContentSection[]
}

export const TextImageSection: FC<TextImageSectionProps> = ({ img, secondaryColor, contentSections, title }: TextImageSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return (
        <StyledSection secondaryColor={secondaryColor} paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>
            <MainWrapper $isTablet={isTablet}>
                {!isMobile && <ImageBorderedBox imgSrc={img} />}
                {isMobile && <StyledSpace large vertical />}

                <TextWrapper $isMobile={isMobile}>
                    <StyledText content={title} tag="h2" />
                    <ShortParagraphsLoop contentSections={contentSections} />
                </TextWrapper>
            </MainWrapper>
            <StyledSpace small vertical />
        </StyledSection>
    );
};
