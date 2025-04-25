import { ReactElement, SetStateAction, useContext, useRef, Dispatch, useState } from "react";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledBox } from "../themed/StyledBox";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { LoginState } from "../../store/slices/login.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import { deleteCourseService } from "../../services/delete-course.service";
import { UpdateProductFormContext } from "../../contexts/UpdateProductFormProvider";
import { UpdateProductFormContextProps, UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";
import { User } from "../../types/user.types";
import { colors } from "../../config/colors.config";

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

const ModifyDeleteWrapper = styled.div`
    display: flex !important;
    flex-direction: row;
    align-items: center;
`;

export type CourseBoxProps = {
    title: string;
    price: string;
    imageUrl: string;
    link: string;
    courseId: string;
    category: string;
    details: {
        title: string,
        content: string
    }[]
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
    const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);
    const login: LoginState = useSelector((state: RootState) => state.login);
    const [productDeleted, setProductDeleted] = useState<boolean>(false);
    const [productDeletedErrorMessage, setProductDeletedErrorMessage] = useState<string | undefined>("");
    const { isLoggedIn }: {isLoggedIn: boolean} = login;
    const { user }: { user?: User } = login;
    const location = useLocation();
    const isAdminPage: boolean = location.pathname.startsWith("/admin");
    const isAdmin: boolean = isLoggedIn && user?.role === "admin";
    let setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>;
    let updateProductFormState: UpdateProductFormContextStateObject;

    if(isLoggedIn && isAdminPage && isAdmin) {
        const updateProductFormContext: any = useContext(UpdateProductFormContext);
        if(UpdateProductFormContext !== undefined) {
            const {setUpdateProductForm, updateProductForm}: UpdateProductFormContextProps = updateProductFormContext;
            setUpdateProductFormSetState = setUpdateProductForm;
            updateProductFormState = updateProductForm;
            console.log(updateProductFormState)
        }
    }

    const handleDiscoverButtonClick: Function = () => {
      if (hiddenLinkRef.current) {
        hiddenLinkRef.current.click();
      }
    };

    const handleUpdateButtonClick: Function = () => {
        if (setUpdateProductFormSetState) {
            setUpdateProductFormSetState({
                state: true,
                courseId: courseId
            });
        }
    };

    const { isMobile, isTablet } = useMediaQuery();
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

                    {!isLoggedIn && <FadeInWrapper>
                        <StyledButton unsetShadow content={"Discover"} action={handleDiscoverButtonClick} />
                        <Link ref={hiddenLinkRef} state={{ courseId, title, imageUrl, price, category, details }} to={link} style={{ display: 'none' }}> </Link>
                    </FadeInWrapper> }

                    {isLoggedIn && isAdminPage && isAdmin && <ModifyDeleteWrapper>
                        <FadeInWrapper>
                            <StyledButton unsetShadow content="Update" action={handleUpdateButtonClick} />
                        </FadeInWrapper>

                        <StyledSpace horizontal small />

                        <FadeInWrapper>
                            { productDeleted || productDeletedErrorMessage ? !productDeletedErrorMessage ? <StyledText tag="h6" content="Course deleted!" color={colors.dark.errorMessage} /> 
                            :  <StyledText tag="h6" content="Permission denied!" color={colors.dark.errorMessage} />
                            :  <StyledButton unsetShadow content="Delete" action={() => deleteCourseService({
                                courseId: courseId,
                                setProductDeleted: setProductDeleted,
                                setProductDeletedErrorMessage: setProductDeletedErrorMessage,
                                isAdmin: isAdmin
                            })} />}
                        </FadeInWrapper>

                    </ ModifyDeleteWrapper> }
                </div>
            </InnerWrapper>
        </StyledBox>
    );
};
