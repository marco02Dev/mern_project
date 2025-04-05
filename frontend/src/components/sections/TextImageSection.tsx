import { ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import styled from "styled-components";
import { StyledSpace } from "../themed/StyledSpace";
import { sizes } from "../../config/sizes.config";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";

const TextWrapper = styled.div<{$paddingLeft?: boolean, $imageLeft?: boolean, $isMobileDevices: boolean}>`
    width: ${({$imageLeft, $paddingLeft, $isMobileDevices}) => {
        if(!$isMobileDevices) {
            return $imageLeft && $paddingLeft ? '45%' : "55%"
        } else {
            return "100%"
        };

    }};
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: ${({$paddingLeft}) => $paddingLeft ? sizes.spaces.small : "unset"};
    padding-right: ${({$paddingLeft}) => $paddingLeft ? sizes.spaces.small : "unset"};
    ${({$imageLeft, $paddingLeft, $isMobileDevices}) => {
        if(!$isMobileDevices) {
            return $imageLeft && $paddingLeft && "text-align: center"
        } else {
            return null
        }
    }};
`; 

const ImageWrapper = styled.div<{$imageLeft?: boolean}>`
    width: ${({$imageLeft}) => $imageLeft ? '55%' : "45%"};
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
        <StyledSection justifyCenter secondaryColor={secondaryColor} row={!isMobile && !isTablet} alignCenter={!isMobile && !isTablet} paddingLeft={imageLeft ? "unset" : sizes.spaces.medium}>

            {!isMobile && !isTablet && imageSrc && imageLeft && (
                <ImageWrapper $imageLeft={imageLeft}>
                    <FadeInWrapper width="100%" height="100%">
                        <img src={imageSrc} alt={imageAlt || "Image"} />
                    </FadeInWrapper>
                </ImageWrapper>
            )}

            <TextWrapper $isMobileDevices={isMobile || isTablet} $imageLeft $paddingLeft={imageLeft}>
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
