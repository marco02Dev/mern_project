import { ReactElement, FC, useContext } from "react";
import { StyledSpace } from "@client/components/themed/StyledSpace";
import { FadeInWrapper } from "@client/components/animated/FadeInWrapper";
import { StyledButton } from "@client/components/themed/StyledButton";
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