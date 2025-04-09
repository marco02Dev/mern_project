import { ReactElement, FC } from "react";
import { FadeInWrapper } from "../animated/FadeInWrapper";
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
    imageAlt?: string
}

export const ImageBorderlessBox: FC<ImageBorderLessBox> = ({imageLeft, imageSrc, imageAlt}: ImageBorderLessBox): ReactElement => {
    return <Wrapper $imageLeft={imageLeft}>
        <FadeInWrapper width="100%" height="100%">
            <img src={imageSrc} alt={imageAlt || "Image"} />
        </FadeInWrapper>
    </Wrapper>
}