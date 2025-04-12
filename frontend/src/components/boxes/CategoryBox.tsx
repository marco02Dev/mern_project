import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { FC } from "react";
import { StyledBox } from "../themed/StyledBox";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import whiteTick from"../../images/svg/tick-white.svg";
import blackTick from"../../images/svg/tick-black.svg";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";

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
    marginLeft?: string
}

export const CategoryBox: FC<CategoryBoxProps> = ({title, description, to}: CategoryBoxProps): ReactElement => {

    const { isMobile }: UseMediaQuery = useMediaQuery();
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

    return <StyledBox width={isMobile ? "100%" : "48%"} height={isMobile ? "18vh" : "30vh"}>
        <Wrapper>
            <ImageWrapper>
                <img width={"70%"} src={mode === 'dark' ? whiteTick : blackTick } alt="Checkmark icon" />
            </ImageWrapper> 

            <TextWrapper>
                <StyledText tag="h3" content={title} />
                <StyledSpace small vertical />
                {!isMobile && <>
                    <StyledText tag="p" size="h5"  content={description} smallParagraph />
                    <StyledSpace small vertical/>
                </>}
                <StyledButton content="Discover" to={to} headerElement/>
            </TextWrapper>
        </Wrapper>
    </StyledBox>;
};