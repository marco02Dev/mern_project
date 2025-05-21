import { ReactElement, FC } from "react";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import styled from "styled-components";

const Wrapper = styled.div<{$imageLeft?: boolean}>`
    width: ${({$imageLeft}) => $imageLeft ? '55%' : "45%"};
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

type ImageBorderLessBox = {
    imageLeft?: boolean,
    imageSrc?: string,
    imageAlt?: string,
    delay?: string
}

export const ImageBorderlessBox: FC<ImageBorderLessBox> = ({imageLeft, imageSrc, imageAlt, delay}: ImageBorderLessBox): ReactElement => {
    return <Wrapper $imageLeft={imageLeft}>
        <FadeInWrapper delay={delay} width="100%" height="100%">
            <img src={imageSrc} alt={imageAlt || "Image"} />
        </FadeInWrapper>
    </Wrapper>
}