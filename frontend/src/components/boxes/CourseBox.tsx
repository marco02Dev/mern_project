import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { sizes } from "../../config/sizes.config";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { colors } from "../../config/colors.config";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { courseBoxHoverAnimation } from "../../animations/course-box.animation";

const Wrapper = styled.div<{$isMobileDevices: boolean}>`
    position: relative;
    width: ${({$isMobileDevices}) => $isMobileDevices ? "100%" : "48%"};
    display: flex;
    box-sizing: border-box;
    height: ${({$isMobileDevices}) => $isMobileDevices ? "40vh" : "clamp(40vh, 35vh + 20vw, 100vw)"};;
    ${() => courseBoxHoverAnimation}
`;

const CourseWrapper = styled.li<{
        $smallSpace: string, 
        $mediumSpace: string, 
        $isMobileDevices: boolean,
        $backgroundColor: string,
        $borderColor: string
    }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-color: ${({$borderColor}) => $borderColor};
    border-width: ${() => sizes.heights.verySmall};
    border-style: solid;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    z-index: 1;
    position: relative;
    .image-wrapper {
        padding-left: ${({$smallSpace}) => $smallSpace};
        padding-right: ${({$smallSpace}) => $smallSpace};
        width: 100%;
        height: 55%;
        box-sizing: content-box;
        div {
            width: 100%;
            height: 100%;
            img {
                object-fit: cover;
                padding-top: 5%;
                padding-bottom: 5%;
                width: 90%;
                height: 90%;
            }
        }
    };
    .text-wrapper {
        padding-left: 10%;
        padding-right: 10%;
        width: 80%;
        height: 45%;
    };
`;

const CourseShadow = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 100%;
    height: 100%;
    bottom: 0;
    z-index: 0;
    bottom: -2%;
    right: -2%;
`;

export type CourseBoxProps = {
    title: string,
    price: string,
    imageUrl: string,
    link: string,
    courseId: string
}

export const CourseBox = ({title, price, imageUrl, link, courseId}: CourseBoxProps): ReactElement => {

    const { isMobile, isTablet } = useMediaQuery();
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext)
    const color = mode === "dark" ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary;
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;

    return <Wrapper $isMobileDevices={isMobile || isTablet}>
        <CourseWrapper $borderColor={borderColor} $backgroundColor={color}  $isMobileDevices={isMobile || isTablet} key={courseId} $mediumSpace={sizes.spaces.large} $smallSpace={"5%"}>
            <div className="image-wrapper">
                <FadeInWrapper>
                    <img src={imageUrl} alt={title} width={150}/>
                </FadeInWrapper>
            </div>

            <div className="text-wrapper">
                <StyledSpace small vertical height="10%" />

                <TextRevealWrapper>
                    <StyledText tag="h6" content={price}/>
                </TextRevealWrapper>

                <StyledSpace small vertical height="5%" />

                <TextRevealWrapper left>
                    <StyledText tag="h5" content={title}/>
                </TextRevealWrapper>
                <StyledSpace small vertical height="5%" />

                <FadeInWrapper>
                    <StyledButton content={"Discover"} to={link}/>
                </FadeInWrapper>

            </div>
        </CourseWrapper>

        <CourseShadow $color="black" />
    </Wrapper>
}