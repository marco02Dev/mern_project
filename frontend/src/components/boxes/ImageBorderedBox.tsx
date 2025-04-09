import { ReactElement, FC } from "react";
import { StyledSpace } from "../themed/StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import styled from "styled-components";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";

const Wrapper = styled.div<{$isMobile: boolean, $isTablet: boolean}>`
    width: ${({$isMobile, $isTablet}) => $isMobile || $isTablet ? '100%' : '50%'};
    height: 100%;
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
    imgSrc: string
}

export const ImageBorderedBox: FC<ImageBorderdBoxProps> = ({imgSrc}: ImageBorderdBoxProps): ReactElement => {

    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return <Wrapper $isTablet={isTablet} $isMobile={isMobile}>
        <StyledSpace large vertical />
        <FadeInWrapper>
            <img src={imgSrc} alt="" />
        </FadeInWrapper>
    </Wrapper>
}