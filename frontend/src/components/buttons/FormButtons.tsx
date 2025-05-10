import { FC, Dispatch, SetStateAction, RefObject } from "react";
import { ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { UpdateProductFormContextStateObject } from "../../../admin/contexts/UpdateProductFormProvider";
import { useHiddenLink } from "../../hooks/navigation/useHiddenLink";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

type FormButtonsProps = {
    productImage?: boolean;
    delay?: string;
    setCrateProductForm?: Dispatch<SetStateAction<boolean>>;
    setUpdateProductFormSetState?: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>;
}

export const FormButtons: FC<FormButtonsProps> = ({
    productImage,
    setCrateProductForm,
    setUpdateProductFormSetState,
    delay
}: FormButtonsProps): ReactElement => {
    const { hiddenRef, handleHiddenClick } = useHiddenLink();

    return (
        <Wrapper>
            <FadeInWrapper delay={delay}>
                <StyledButton content="Send it" action={handleHiddenClick} unsetShadow />
                <button className="is-hidden" ref={hiddenRef as RefObject<HTMLButtonElement>} type="submit" />
            </FadeInWrapper>

            {productImage && (setCrateProductForm || setUpdateProductFormSetState) && (
                <>
                    <StyledSpace horizontal medium />
                    <FadeInWrapper>
                        <StyledButton
                            content="Undo"
                            action={() => {
                                if (setCrateProductForm) {
                                    setCrateProductForm(false);
                                } else if (setUpdateProductFormSetState) {
                                    setUpdateProductFormSetState({
                                        state: false,
                                        courseId: ""
                                    });
                                }
                            }}
                            unsetShadow
                        />
                    </FadeInWrapper>
                </>
            )}
        </Wrapper>
    );
};