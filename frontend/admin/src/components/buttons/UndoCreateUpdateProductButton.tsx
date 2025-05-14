import { ReactElement, FC, useContext } from "react";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { ProductManagementContext } from "../../contexts/ProductMenagementContextProvider";

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