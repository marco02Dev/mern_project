import { FC, ReactElement, Dispatch, SetStateAction, useContext, useEffect, useState, MouseEventHandler} from "react";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";
import { UseAuth, useAuth } from "../../../../client/src/hooks/auth/useAuth";
import styled from "styled-components";
import { StyledButton } from "../../../../client/src/components/themed/StyledButton";
import { FadeInWrapper } from "../../../../client/src/components/animated/FadeInWrapper";
import { StyledText } from "../../../../client/src/components/themed/StyledText";
import { StyledSpace } from "../../../../client/src/components/themed/StyledSpace";
import { colors } from "../../../../client/src/config/colors.config";
import { deleteCourseService } from "../../services/delete-course.service";
import { useDispatch } from "react-redux";
import { useLocation, Location } from "react-router-dom";
import { UpdateProductFormContext, UpdateProductFormContextProps } from "../../contexts/UpdateProductFormProvider";
import { setDataChanged } from "../../../../client/src/store/slices/courses-data-changed.slice";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { sumStringDelays } from "../../../../client/src/utils/components/sum-string-delays.util";
import { useBodyOverflow } from "../../../../client/src/hooks/ui/useBodyOverflow";

const Wrapper = styled.div`
    display: flex !important;
    flex-direction: row;
    align-items: center;
`;

type UpdateDeleteCourseButtonProps = {
    courseId: string,
    initialDelay?: string
}

export const UpdateDeleteCourseButtons: FC<UpdateDeleteCourseButtonProps> = ({
    courseId,
    initialDelay
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

    const { isLoggedIn, isAdmin }: UseAuth = useAuth();
    const isAdminPage: boolean = location.pathname.startsWith("/admin");


    if(isLoggedIn && isAdminPage && isAdmin) {
        const updateProductFormContext = useContext(UpdateProductFormContext);
        if(UpdateProductFormContext !== undefined) {
            const {setUpdateProductForm, updateProductForm}: UpdateProductFormContextProps = updateProductFormContext;
            setUpdateProductFormSetState = setUpdateProductForm;
            updateProductFormState = updateProductForm;
        }
    }

    const handleUpdateButtonClick: MouseEventHandler = () => {
        if (setUpdateProductFormSetState) {
            setUpdateProductFormSetState({
                state: true,
                courseId: courseId
            });
        }
    };

    useBodyOverflow(updateProductFormState.courseId ? true : false)

    useEffect(() => {
        if (productDeleted) {
            dispatch(setDataChanged());
        }
    }, [productDeleted, dispatch]);

    return (
        <Wrapper>
            {!updateProductFormState.state && (
                <>
                    <FadeInWrapper delay={initialDelay}>
                        <a href="#update-course-form-section">
                            <StyledButton 
                                unsetShadow 
                                content="Update" 
                                action={handleUpdateButtonClick} 
                            />
                        </a>
                    </FadeInWrapper>
                    <StyledSpace horizontal small />
                </>
            )}
    
            <FadeInWrapper delay={sumStringDelays(initialDelay, "200ms")}>
                {productDeleted || productDeletedErrorMessage ? 
                    (!productDeletedErrorMessage ? 
                        <StyledText tag="h6" content="Course deleted!" color={colors.dark.errorMessage} /> :
                        <StyledText tag="h6" content="Permission denied!" color={colors.dark.errorMessage} />
                    ) :
                    <>
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

                    </>
                }
            </FadeInWrapper>
        </Wrapper>
    );
}