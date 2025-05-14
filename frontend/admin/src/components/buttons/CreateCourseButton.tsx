import { FC, ReactElement, useContext } from "react";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledText } from "@shared/components/themed/StyledText";
import { colors } from "@shared/config/colors.config";
import { ProductManagementContext, ProductManagementContextProps } from "@admin/contexts/ProductMenagementContextProvider";

/**
 * `CreateCourseButton` is an **admin-only component** that renders a button 
 * primarily used to **navigate to the course creation section** and make the 
 * course creation form visible.
 * 
 * - When clicked, it sets the product creation form to visible and resets the `productCreated` flag using the `ProductManagementContext`.
 * - If a product has just been created, it displays a success message.
 *
 * This button links to the section `#create-course-form-section` in the admin interface.
 *
 * @returns {ReactElement} A button for course creation (visible only to admins), and an optional success message.
*/

export const CreateCourseButton: FC = (): ReactElement => {
    const { setCreateProductForm, setProductCreated, productCreated }: ProductManagementContextProps = useContext(ProductManagementContext);

    return <>
        <FadeInWrapper>
            <a href="#create-course-form-section" style={{textDecoration: "none"}}>
                <StyledButton unsetShadow content="Create course" action={(): void => {
                    setCreateProductForm(true);
                    setProductCreated(false);
                }} />
            </a>
        </FadeInWrapper>

        {productCreated && <>
            <StyledSpace small horizontal />
            <StyledText tag="h6" color={colors.dark.successMessage} content="New Product created!" />
        </>}
    </>
}