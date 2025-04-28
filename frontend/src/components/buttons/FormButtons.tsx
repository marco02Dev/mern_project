import { FC, Dispatch, SetStateAction } from "react";
import { ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";
import { useHiddenLink } from "../../hooks/useHiddenLink";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

type FormButtonsProps = {
    productImage?: boolean;
    setCrateProductForm?: Dispatch<SetStateAction<boolean>>;
    setUpdateProductFormSetState?: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>;
}

export const FormButtons: FC<FormButtonsProps> = ({
    productImage,
    setCrateProductForm,
    setUpdateProductFormSetState
}: FormButtonsProps): ReactElement => {
    const { hiddenRef, handleHiddenClick } = useHiddenLink();

    return (
        <Wrapper>
            <FadeInWrapper>
                <StyledButton content="Send it" action={handleHiddenClick} unsetShadow />
                <button className="is-hidden" ref={hiddenRef} type="submit" />
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