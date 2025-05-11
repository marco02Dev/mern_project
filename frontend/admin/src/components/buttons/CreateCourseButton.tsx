import { FC, ReactElement, Dispatch, SetStateAction } from "react";
import { FadeInWrapper } from "../../../../client/src/components/animated/FadeInWrapper";
import { StyledButton } from "../../../../client/src/components/themed/StyledButton";
import { StyledSpace } from "../../../../client/src/components/themed/StyledSpace";
import { StyledText } from "../../../../client/src/components/themed/StyledText";
import { useAuth, UseAuth } from "../../../../client/src/hooks/auth/useAuth";
import { colors } from "../../../../client/src/config/colors.config";

type CreateCourseButtonProps = {
    setCrateProductForm: Dispatch<SetStateAction<boolean>>,
    setProductCreated: Dispatch<SetStateAction<Boolean>>,
    productCreated: boolean,
    createProducts: boolean,
}

export const CreateCourseButton: FC<CreateCourseButtonProps> = ({
    setCrateProductForm,
    setProductCreated,
    createProducts,
    productCreated
}): ReactElement => {
    const { isLoggedIn, isAdmin }: UseAuth = useAuth();

    return <>
        {isLoggedIn && isAdmin && createProducts && <FadeInWrapper>
            <a href="#create-course-form-section" style={{textDecoration: "none"}}>
                <StyledButton unsetShadow content="Create course" action={(): void => {
                    setCrateProductForm(true);
                    setProductCreated(false);
                }} />
            </a>
        </FadeInWrapper> }

        {productCreated && <>
            <StyledSpace small horizontal />
            <StyledText tag="h6" color={colors.dark.successMessage} content="New Product created!" />
        </>}
    </>
}