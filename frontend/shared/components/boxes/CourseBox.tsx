import { ReactElement, FC } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledBox } from "../themed/StyledBox";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/ui/useMediaQuery";
import { DiscoverCourseButton } from "../buttons/DiscoverCourseButton";
import { defaultDelayIncrement } from "@shared/config/animation.config";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { UseMediaQuery } from "../../hooks/ui/useMediaQuery";
import { useAuth, UseAuth } from "../../hooks/auth/useAuth";
import { Course } from "@shared/types/course.types";
import { UseIsCurrentPath, useIsCurrentPath } from "@shared/hooks/navigation/useIsCurrentPath";

const InnerWrapper = styled.div<{$isMobile: boolean}>`
    width: 100%;
    height: ${({$isMobile}) => $isMobile ? "clamp(30vh, 30vh + 10vw, 100vw)" : "clamp(30vh, 30vh + 20vw, 100vw)"};
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

export type CourseBoxProps = Course & {
    link: string,
    delay?: string,
    heroImage: string,
    AdditionalButtons?: FC<{ courseId: string, initialDelay: string }>
};

export const CourseBox = ({
    title,
    price,
    imageUrl,
    link,
    courseId,
    category,
    details,
    delay,
    heroImage,
    AdditionalButtons
}: CourseBoxProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const innerDelay: string = sumStringDelays(delay, defaultDelayIncrement);
    const { isLoggedIn, isAdmin }: UseAuth = useAuth();
    const isAdminPage: UseIsCurrentPath = useIsCurrentPath("/admin");

    const desktopSize: string = '32%';
    const tabletSize: string = '48%';
    const mobileSize: string = '98%';

    return (
        <StyledBox delay={delay} width={isMobile || isTablet ? isMobile ? mobileSize : tabletSize : desktopSize} >
            <InnerWrapper $isMobile={isMobile}>
                <div className="image-wrapper">
                    <FadeInWrapper delay={innerDelay}>
                        <img src={imageUrl} alt={title} width={150} />
                    </FadeInWrapper>
                </div>

                <div className="text-wrapper">

                    {!isMobile && <div className="small-text">
                        <TextRevealWrapper delay={sumStringDelays(innerDelay, "200ms")}>
                            <StyledText tag="h6" content={price as string} />
                        </TextRevealWrapper>
                    </div>}

                    <StyledSpace small vertical height="5%" />

                    <TextRevealWrapper left delay={sumStringDelays(innerDelay, "400ms")} >
                        <StyledText tag="h5" size="p" largeParagraph  content={title} />
                    </TextRevealWrapper>

                    <StyledSpace verySmall vertical height="5%" />

                    {!isAdminPage && courseId && details && <DiscoverCourseButton 
                        courseId={courseId}
                        title={title}
                        imageUrl={imageUrl}
                        price={price}
                        category={category}
                        details={details}
                        link={link}
                        heroImage={heroImage}
                        delay={sumStringDelays(innerDelay, "600ms")}
                    /> }

                    {isLoggedIn && isAdmin && AdditionalButtons && <AdditionalButtons 
                        courseId={courseId}
                        initialDelay={sumStringDelays(innerDelay, "600ms")}
                    />}

                </div>
            </InnerWrapper>
        </StyledBox>
    );
};
