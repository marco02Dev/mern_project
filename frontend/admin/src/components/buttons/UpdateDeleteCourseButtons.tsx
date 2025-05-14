import { FC, ReactElement, useContext, useEffect, useState, MouseEventHandler} from "react";
import { UseAuth, useAuth } from "@shared/hooks/auth/useAuth";
import styled from "styled-components";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledText } from "@shared/components/themed/StyledText";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { colors } from "@shared/config/colors.config";
import { deleteCourseService } from "@admin/services/delete-course.service";
import { useDispatch } from "react-redux";
import { setDataChanged } from "@shared/store/slices/courses-data-changed.slice";
import { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";
import { useBodyOverflow } from "@shared/hooks/ui/useBodyOverflow";
import { ProductManagementContext, ProductManagementContextProps } from "@admin/contexts/ProductMenagementContextProvider";

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
    const { isAdmin }: UseAuth = useAuth()
    const [productDeleted, setProductDeleted] = useState<boolean>(false);
    const [productDeletedErrorMessage, setProductDeletedErrorMessage] = useState<string | undefined>("");
    const {setUpdateProductForm, updateProductForm}: ProductManagementContextProps = useContext(ProductManagementContext);



    const handleUpdateButtonClick: MouseEventHandler = () => {
        if (setUpdateProductForm) {
            setUpdateProductForm({
                state: true,
                courseId: courseId
            });
        }
    };

    useBodyOverflow(updateProductForm.courseId ? true : false)

    useEffect(() => {
        if (productDeleted) {
            dispatch(setDataChanged());
        }
    }, [productDeleted, dispatch]);

    return (
        <Wrapper>
            {!updateProductForm.state && (
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