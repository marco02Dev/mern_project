import { FC, ReactElement, Dispatch, SetStateAction, useContext } from "react";
import { FadeInWrapper } from "@client/components/animated/FadeInWrapper";
import { StyledButton } from "@client/components/themed/StyledButton";
import { StyledSpace } from "@client/components/themed/StyledSpace";
import { StyledText } from "@client/components/themed/StyledText";
import { useAuth, UseAuth } from "@client/hooks/auth/useAuth";
import { colors } from "@client/config/colors.config";
import { CreateProductFormContext, CreateProductFormContextProps } from "../../contexts/CreateProductFormContextProvider";

type CreateCourseButtonProps = {
    setProductCreated: Dispatch<SetStateAction<Boolean>>,
    productCreated: boolean,
    createProducts: boolean,
}

export const CreateCourseButton: FC<CreateCourseButtonProps> = ({
    setProductCreated,
    createProducts,
    productCreated
}): ReactElement => {
    const { isLoggedIn, isAdmin }: UseAuth = useAuth();
    const { setCreateProductForm }: CreateProductFormContextProps = useContext(CreateProductFormContext);

    return <>
        {isLoggedIn && isAdmin && createProducts && <FadeInWrapper>
            <a href="#create-course-form-section" style={{textDecoration: "none"}}>
                <StyledButton unsetShadow content="Create course" action={(): void => {
                    setCreateProductForm(true);
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