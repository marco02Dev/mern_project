import { ReactElement } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledBox } from "../themed/StyledBox";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { LoginState } from "../../store/slices/login.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation, Location } from "react-router-dom";
import { User } from "../../types/user.types";
import { UpdateDeleteCourseButtons } from "../buttons/UpdateDeleteCourseButtons";
import { DiscoverCourseButton } from "../buttons/DiscoverCourseButton";

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

export type CourseBoxProps = {
    title: string;
    price: string;
    imageUrl: string;
    link: string;
    courseId: string | undefined;
    category: string;
    details: {
        title: string,
        content: string
    }[] | undefined
};

export const CourseBox = ({
    title,
    price,
    imageUrl,
    link,
    courseId,
    category,
    details
}: CourseBoxProps): ReactElement => {
    const login: LoginState = useSelector((state: RootState) => state.login);
    const location: Location = useLocation();
    const { isMobile, isTablet } = useMediaQuery();

    const { isLoggedIn }: {isLoggedIn: boolean} = login;
    const { user }: { user?: User } = login;
    const isAdminPage: boolean = location.pathname.startsWith("/admin");
    const isAdmin: boolean = isLoggedIn && user?.role === "admin";

    const desktopSize: string = '32%';
    const tabletSize: string = '48%';
    const mobileSize: string = '98%';


    return (
        <StyledBox width={isMobile || isTablet ? isMobile ? mobileSize : tabletSize : desktopSize} >
            <InnerWrapper $isMobile={isMobile}>
                <div className="image-wrapper">
                    <FadeInWrapper>
                        <img src={imageUrl} alt={title} width={150} />
                    </FadeInWrapper>
                </div>

                <div className="text-wrapper">

                    {!isMobile && <div className="small-text">
                        <TextRevealWrapper>
                            <StyledText tag="h6" content={price} />
                        </TextRevealWrapper>
                    </div>}

                    <StyledSpace small vertical height="5%" />

                    <TextRevealWrapper left>
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
                    /> }

                    {isLoggedIn && isAdminPage && isAdmin && courseId && <UpdateDeleteCourseButtons courseId={courseId}/> }
                </div>
            </InnerWrapper>
        </StyledBox>
    );
};
