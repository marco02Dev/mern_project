import { ReactElement, FC, useContext } from "react";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { ProductManagementContext } from "@admin/contexts/ProductMenagementContextProvider";

/**
 * `UndoCreateUpdateProductButton` is an **admin-only component** that renders a button used 
 * to **reset** the state of the course creation and update forms.
 * 
 * - On click, it:
 *   - Hides the course creation form by setting `setCreateProductForm(false)`.
 *   - If the update form is visible, it resets the update form state by calling `setUpdateProductForm` with `{ state: false, courseId: "" }`.
 * 
 * This button is primarily used to cancel or undo the course creation or update process.
 * 
 * @returns {ReactElement} A button to undo course creation or update.
*/

export const UndoCreateUpdateProductButton: FC = (): ReactElement => {

    const { setCreateProductForm, setUpdateProductForm } = useContext(ProductManagementContext);

    return <>
        <StyledSpace horizontal medium />

        <FadeInWrapper>
            <StyledButton
                content="Undo"
                action={() => {
                    if (setCreateProductForm) {
                        setCreateProductForm(false);
                    } else if (setUpdateProductForm) {
                        setUpdateProductForm({
                            state: false,
                            courseId: ""
                        });
                    }
                }}
                unsetShadow
            />
        </FadeInWrapper>
    </>
}