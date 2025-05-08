import { ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import styled from "styled-components";
import { StyledSpace } from "../themed/StyledSpace";
import { sizes } from "../../config/sizes.config";
import { useMediaQuery, UseMediaQuery } from "../../hooks/ui/useMediaQuery";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { FC } from "react";
import { ImageBorderlessBox } from "../boxes/ImageBorderlessBox";
import { ImageBorderedBox } from "../boxes/ImageBorderedBox";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

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
    padding-right: ${({$paddingLeft, $imageLeft}) => $paddingLeft || !$imageLeft ? sizes.spaces.small : "unset"};

`; 

type HeroSectionProps = {
    eyebrowText?: string;
    title: string;
    description?: string;
    buttonLabel?: string;
    buttonLink?: string;
    buttonAction?: (args: { dispatch: Dispatch, navigate: NavigateFunction }) => void;
    imageSrc?: string;
    imageAlt?: string;
    secondaryColor?: boolean;
    imageLeft?: boolean;
    borderedImage?: boolean;
};

export const HeroSection: FC<HeroSectionProps> = ({
    eyebrowText,
    title,
    description,
    buttonLabel,
    buttonLink,
    imageSrc,
    imageAlt,
    secondaryColor,
    imageLeft,
    borderedImage,
    buttonAction
}: HeroSectionProps): ReactElement => {

    const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();
    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    return (
        <StyledSection justifyCenter secondaryColor={secondaryColor} row={!isMobile && !isTablet} alignCenter={!isMobile && !isTablet} paddingLeft={imageLeft ? "unset" : sizes.spaces.medium}>

            {!isMobile && !isTablet && imageSrc && imageLeft && (
                <ImageBorderlessBox imageLeft={imageLeft} imageSrc={imageSrc} imageAlt={imageAlt} />
            )}


            <TextWrapper $isMobileDevices={isMobile || isTablet} $imageLeft={imageLeft} $paddingLeft={imageLeft}>
                <StyledSpace large vertical />

                {eyebrowText && (
                    <TextRevealWrapper>
                        <StyledText tag="p" content={eyebrowText} fontWeight={'600 !important'} size="h5"/>
                    </TextRevealWrapper>
                )}

                <StyledSpace medium vertical />

                <TextRevealWrapper left delay={"700ms"}>
                    <StyledText tag="h2" content={title} />
                </TextRevealWrapper>

                <StyledSpace small vertical />

                {description && (
                    <TextRevealWrapper delay={"1000ms"}>
                        <StyledText tag="p" content={description} />
                    </TextRevealWrapper>
                )}

                <StyledSpace medium vertical />

                {buttonLabel && (
                    <FadeInWrapper delay={"1200ms"}>
                        <StyledButton 
                            content={buttonLabel} 
                            to={buttonLink} 
                            action={buttonAction ? () => buttonAction({ dispatch, navigate }) : undefined} 
                        />
                    </FadeInWrapper>
                )}
            </TextWrapper>

            {!isMobile && !isTablet && imageSrc && !imageLeft && !borderedImage && (
                <ImageBorderlessBox delay={"1400ms"} imageLeft={imageLeft} imageSrc={imageSrc} imageAlt={imageAlt} />
            )}

            {!isMobile && !isTablet && imageSrc && !imageLeft && borderedImage && (
                <ImageBorderedBox  delay={"1400ms"} imgSrc={imageSrc} />
            )}
        </StyledSection>
    );
};
