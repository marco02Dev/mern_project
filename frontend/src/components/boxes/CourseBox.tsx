import { ReactElement } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledBox } from "../themed/StyledBox";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const InnerWrapper = styled.div`
    width: 100%;
    height: 40vh;
    display: flex;
    flex-direction: column;

    .image-wrapper {
        padding-left: 5%;
        padding-right: 5%;
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
    }

    .text-wrapper {
        padding-left: 10%;
        padding-right: 10%;
        width: 80%;
        height: 45%;
        div:last-child {
            display: inline-block;
        }
    }
`;

export type CourseBoxProps = {
    title: string;
    price: string;
    imageUrl: string;
    link: string;
    courseId: string;
    twoBoxes?: boolean;
    threeBoxes?: boolean
};

export const CourseBox = ({
    title,
    price,
    imageUrl,
    link,
    courseId,
    twoBoxes,
    threeBoxes
}: CourseBoxProps): ReactElement => {

    const { isMobile, isTablet } = useMediaQuery();

    let boxSize: string;

    if(twoBoxes) {
        boxSize = "48%";
    } else if(threeBoxes) {
        boxSize = "32%";        
    } else {
        boxSize = "48%";
    }

    return (
        <StyledBox width={isMobile || isTablet ? "98%" : boxSize} key={courseId}>
            <InnerWrapper>
                <div className="image-wrapper">
                    <FadeInWrapper>
                        <img src={imageUrl} alt={title} width={150} />
                    </FadeInWrapper>
                </div>

                <div className="text-wrapper">
                    <StyledSpace small vertical height="10%" />

                    <TextRevealWrapper>
                        <StyledText tag="h6" content={price} />
                    </TextRevealWrapper>

                    <StyledSpace small vertical height="5%" />

                    <TextRevealWrapper left>
                        <StyledText tag="h5" content={title} />
                    </TextRevealWrapper>

                    <StyledSpace small vertical height="5%" />

                    <FadeInWrapper >
                        <StyledButton content={"Discover"} to={link} />
                    </FadeInWrapper>
                </div>
            </InnerWrapper>
        </StyledBox>
    );
};
