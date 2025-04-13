import { ReactElement, useRef } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledBox } from "../themed/StyledBox";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";

const InnerWrapper = styled.div`
    width: 100%;
    height: clamp(30vh, 30vh + 20vw, 100vw);
    display: flex;
    flex-direction: column;

    .image-wrapper {
        width: 100%;
        height: 55%;
        box-sizing: content-box;
        div {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            img {
                object-fit: cover;
                padding-top: 5%;
                padding-bottom: 5%;
                width: 94%;
                height: 90%;
            }
        }
    }

    .text-wrapper {
        width: 80%;
        height: 45%;
        align-items: start;
        justify-content: center;
        display: flex;
        flex-direction: column;
        text-align: start;
        padding-left: 10%;
        padding-right: 10%;
        div:last-child {
            display: inline-block;
        }
        .small-text {
            height: 10%;
            width: 100%;
            div {
                height: 100%;
                h6 {
                    height: 100% !important;
                }
            }
        }

    }
`;

export type CourseBoxProps = {
    title: string;
    price: string;
    imageUrl: string;
    link: string;
    courseId: string;
    category: string;
};

export const CourseBox = ({
    title,
    price,
    imageUrl,
    link,
    courseId,
    category
}: CourseBoxProps): ReactElement => {
    const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

    const handleButtonClick = () => {
      if (hiddenLinkRef.current) {
        hiddenLinkRef.current.click();
      }
    };

    const { isMobile, isTablet } = useMediaQuery();
    const desktopSize: string = '32%';
    const tabletSize: string = '48%';
    const mobileSize: string = '98%';


    return (
        <StyledBox width={isMobile || isTablet ? isMobile ? mobileSize : tabletSize : desktopSize} >
            <InnerWrapper>
                <div className="image-wrapper">
                    <FadeInWrapper>
                        <img src={imageUrl} alt={title} width={150} />
                    </FadeInWrapper>
                </div>

                <div className="text-wrapper">

                    <div className="small-text">
                        <TextRevealWrapper>
                            <StyledText tag="h6" content={price} />
                        </TextRevealWrapper>
                    </div>

                    <StyledSpace small vertical height="5%" />

                    <TextRevealWrapper left>
                        <StyledText tag="h5" size="p" largeParagraph  content={title} />
                    </TextRevealWrapper>

                    <StyledSpace verySmall vertical height="5%" />

                    <FadeInWrapper>
                        <StyledButton unsetShadow content={"Discover"} action={handleButtonClick} />
                        <Link ref={hiddenLinkRef} state={{ courseId, title, imageUrl, price, category }} to={link} style={{ display: 'none' }}> </Link>
                    </FadeInWrapper>
                </div>
            </InnerWrapper>
        </StyledBox>
    );
};
