import { FC, ReactElement, useContext } from "react";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledText } from "@shared/components/themed/StyledText";
import { useAuth, UseAuth } from "@shared/hooks/auth/useAuth";
import { colors } from "@shared/config/colors.config";
import { ProductManagementContext, ProductManagementContextProps } from "../../contexts/ProductMenagementContextProvider";

export const CreateCourseButton: FC = (): ReactElement => {
    const { isLoggedIn, isAdmin }: UseAuth = useAuth();
    const { setCreateProductForm, setProductCreated, productCreated }: ProductManagementContextProps = useContext(ProductManagementContext);

    return <>
        {isLoggedIn && isAdmin && <FadeInWrapper>
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