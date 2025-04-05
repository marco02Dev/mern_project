import { ReactElement } from "react";
import styled from "styled-components";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { sizes } from "../../config/sizes.config";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";

const CourseWrapper = styled.li<{$smallSpace: string, $mediumSpace: string, $isMobileDevices: boolean}>`
    display: flex;
    flex-direction: column;
    width: ${({$isMobileDevices}) => $isMobileDevices ? "100%" : "49%"};
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
    }
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

    return <CourseWrapper $isMobileDevices={isMobile || isTablet} key={courseId} $mediumSpace={sizes.spaces.large} $smallSpace={"5%"}>
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
}