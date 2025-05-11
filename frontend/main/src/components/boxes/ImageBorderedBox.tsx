import { ReactElement, FC } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import styled from "styled-components";
import { useMediaQuery, UseMediaQuery } from "../../hooks/ui/useMediaQuery";

const Wrapper = styled.div<{
    $isMobile: boolean, 
    $isTablet: boolean,
    $boxWidth?: string,
    }>`
    width: ${({$isMobile, $isTablet, $boxWidth}) => $isMobile || $isTablet ? '100%' : $boxWidth ? $boxWidth : "50%"};
    height: ${({$isTablet}) => $isTablet ? '50%' : '100%'};
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
            height: ${({$isTablet}) => $isTablet ? '100%' : '85%'};
            object-fit: cover;
        }
    }

`;

type ImageBorderdBoxProps = {
    imgSrc?: string,
    boxWidth?: string,
    delay?: string
}

export const ImageBorderedBox: FC<ImageBorderdBoxProps> = ({imgSrc, boxWidth, delay}: ImageBorderdBoxProps): ReactElement => {

    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return <Wrapper $boxWidth={boxWidth} $isTablet={isTablet} $isMobile={isMobile}>
        <FadeInWrapper delay={delay} width="50%">
            <img src={imgSrc} alt="" />
        </FadeInWrapper>
    </Wrapper>
}