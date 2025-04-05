import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledText } from "../../styles/styled-text";
import { StyledButton } from "../../styles/styled-button";
import styled from "styled-components";
import { StyledSpace } from "../../styles/styled-space";
import { sizes } from "../../config/sizes.config";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";
import { FadeInWrapper } from "../animated/fade-in-wrapper";
import { TextRevealWrapper } from "../animated/text-reveal-wrapper";

const TextWrapper = styled.div<{$paddingLeft?: boolean}>`
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: ${({$paddingLeft}) => $paddingLeft ? sizes.spaces.small : "unset"};
`; 

const ImageWrapper = styled.div`
    width: 40%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

type TextImageSectionProps = {
    eyebrowText?: string;
    title: string;
    description?: string;
    buttonLabel?: string;
    buttonLink?: string;
    imageSrc?: string;
    imageAlt?: string;
    secondaryColor?: boolean;
    imageLeft?: boolean;
};

export const TextImageSection = ({
    eyebrowText,
    title,
    description,
    buttonLabel,
    buttonLink,
    imageSrc,
    imageAlt,
    secondaryColor,
    imageLeft
}: TextImageSectionProps): ReactElement => {

    const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();

    return (
        <StyledSection justifyCenter secondaryColor={secondaryColor} row={!isMobile && !isTablet} alignCenter={!isMobile && !isTablet} paddingLeft={sizes.spaces.medium}>

            {!isMobile && !isTablet && imageSrc && imageLeft && (
                <ImageWrapper>
                    <FadeInWrapper width="100%" height="100%">
                        <img src={imageSrc} alt={imageAlt || "Image"} />
                    </FadeInWrapper>
                </ImageWrapper>
            )}

            <TextWrapper $paddingLeft={imageLeft}>
                <StyledSpace large vertical />

                {eyebrowText && (
                    <TextRevealWrapper>
                        <StyledText tag="p" content={eyebrowText} fontWeight={'600 !important'} size="h5"/>
                    </TextRevealWrapper>
                )}

                <StyledSpace medium vertical />

                <TextRevealWrapper left>
                    <StyledText tag="h2" content={title} />
                </TextRevealWrapper>

                <StyledSpace small vertical />

                {description && (
                    <TextRevealWrapper>
                        <StyledText tag="p" content={description} />
                    </TextRevealWrapper>
                )}

                <StyledSpace medium vertical />

                {buttonLabel && buttonLink && (
                    <FadeInWrapper>
                        <StyledButton content={buttonLabel} to={buttonLink} />
                    </FadeInWrapper>
                )}

            </TextWrapper>

            {!isMobile && !isTablet && imageSrc && !imageLeft && (
                <ImageWrapper>
                    <FadeInWrapper width="100%" height="100%">
                        <img src={imageSrc} alt={imageAlt || "Image"} />
                    </FadeInWrapper>
                </ImageWrapper>
            )}

        </StyledSection>
    );
};
