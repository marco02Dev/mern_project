import { FC, ReactElement, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";
import styled from "styled-components";
import { StyledButton } from "../themed/StyledButton";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { colors } from "../../config/colors.config";
import { deleteCourseService } from "../../services/delete-course.service";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { LoginState } from "../../store/slices/login.slice";
import { User } from "../../types/user.types";
import { useLocation, Location } from "react-router-dom";
import { UpdateProductFormContext, UpdateProductFormContextProps } from "../../contexts/UpdateProductFormProvider";
import { setDataChanged } from "../../store/slices/courses-data-changed.slice";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";

const Wrapper = styled.div`
    display: flex !important;
    flex-direction: row;
    align-items: center;
`;

type UpdateDeleteCourseButtonProps = {
    courseId: string
}

export const UpdateDeleteCourseButtons: FC<UpdateDeleteCourseButtonProps> = ({
    courseId,
}: UpdateDeleteCourseButtonProps): ReactElement => {
    const dispatch: ReduxDispatch = useDispatch();
    const location: Location = useLocation();
    const [productDeleted, setProductDeleted] = useState<boolean>(false);
    const [productDeletedErrorMessage, setProductDeletedErrorMessage] = useState<string | undefined>("");
    let setUpdateProductFormSetState: Dispatch<SetStateAction<UpdateProductFormContextStateObject>> = () => {};
    let updateProductFormState: UpdateProductFormContextStateObject = {
        state: false,
        courseId: ""
    }

    const login: LoginState = useSelector((state: RootState) => state.login);
    const { isLoggedIn }: {isLoggedIn: boolean} = login;
    const { user }: { user?: User } = login;
    const isAdmin: boolean = isLoggedIn && user?.role === "admin";
    const isAdminPage: boolean = location.pathname.startsWith("/admin");

    if(isLoggedIn && isAdminPage && isAdmin) {
        const updateProductFormContext: any = useContext(UpdateProductFormContext);
        if(UpdateProductFormContext !== undefined) {
            const {setUpdateProductForm, updateProductForm}: UpdateProductFormContextProps = updateProductFormContext;
            setUpdateProductFormSetState = setUpdateProductForm;
            updateProductFormState = updateProductForm;
            console.log(updateProductFormState)
        }
    }

    const handleUpdateButtonClick: Function = () => {
        if (setUpdateProductFormSetState) {
            setUpdateProductFormSetState({
                state: true,
                courseId: courseId
            });
        }
    };

    useEffect(() => {
        if (productDeleted) {
            dispatch(setDataChanged());
        }
    }, [productDeleted, dispatch]);

    return (
        <Wrapper>
            {!updateProductFormState.state && (
                <>
                    <FadeInWrapper>
                        <StyledButton unsetShadow content="Update" action={handleUpdateButtonClick} />
                    </FadeInWrapper>
                    <StyledSpace horizontal small />
                </>
            )}
    
            <FadeInWrapper>
                {productDeleted || productDeletedErrorMessage ? 
                    (!productDeletedErrorMessage ? 
                        <StyledText tag="h6" content="Course deleted!" color={colors.dark.errorMessage} /> :
                        <StyledText tag="h6" content="Permission denied!" color={colors.dark.errorMessage} />
                    ) :
                    <StyledButton 
                        unsetShadow 
                        content="Delete" 
                        action={() => deleteCourseService({
                            courseId: courseId,
                            setProductDeleted: setProductDeleted,
                            setProductDeletedErrorMessage: setProductDeletedErrorMessage,
                            isAdmin: isAdmin
                        })}
                    />
                }
            </FadeInWrapper>
        </Wrapper>
    );
}