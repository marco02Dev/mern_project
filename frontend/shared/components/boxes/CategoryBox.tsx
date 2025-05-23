import { ReactElement } from "react";
import styled from "styled-components";
import { StyledText } from "@shared/components/themed/StyledText";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { FC } from "react";
import { StyledBox } from "@shared/components/themed/StyledBox";
import { useMediaQuery, UseMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { ThemeColors, useThemeColors } from "@shared/hooks/theme/useThemeColors";

const Wrapper = styled.div`
    width: 100%;
    height: clamp(30vh, 30vh + 20vw, 100vw);
    display: flex;
    flex-direction: row;
`;

const ImageWrapper = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-right: 5%;
    div {
        display: flex;
        justify-content: center;   
    }
`;

const TextWrapper = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

type CategoryBoxProps = {
    title: string,
    description: string,
    to: string,
    marginLeft?: string,
    delay: string
}

export const CategoryBox: FC<CategoryBoxProps> = ({
    title, 
    description, 
    to,
    delay
}: CategoryBoxProps): ReactElement => {

    const { isMobile }: UseMediaQuery = useMediaQuery();
    const { mode }: ThemeColors = useThemeColors();

    return <StyledBox width={isMobile ? "100%" : "48%"} height={isMobile ? "18vh" : "30vh"} delay={delay}>
        <Wrapper>
            
            <ImageWrapper>
                <FadeInWrapper width="100%" height="100%" delay={sumStringDelays(delay, "300ms")}>
                    <img 
                        width={"70%"} 
                        src={ mode === 'dark' ? 
                            "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746271657/tick-white_gu5cwo.svg" 
                        : 'https://res.cloudinary.com/dqwoo44z8/image/upload/v1746271651/tick-black_ingyci.svg' } 
                        alt="Checkmark icon" />
                </FadeInWrapper>
            </ImageWrapper> 

            <TextWrapper>
                <TextRevealWrapper left delay={sumStringDelays(delay, "600ms")}>
                    <StyledText tag="h3" content={title} />
                </TextRevealWrapper>
                <StyledSpace small vertical />
                {!isMobile && <>
                    <TextRevealWrapper delay={sumStringDelays(delay, "800ms")}>
                        <StyledText tag="p" size="h5"  content={description} smallParagraph />
                    </TextRevealWrapper>
                    <StyledSpace small vertical/>
                </>}
                <FadeInWrapper delay={sumStringDelays(delay, "900ms")}>
                    <StyledButton content="Discover" to={to} unsetShadow/>
                </FadeInWrapper>
            </TextWrapper>
        </Wrapper>
    </StyledBox>;
};