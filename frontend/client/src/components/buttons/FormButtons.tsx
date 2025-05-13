import { FC, RefObject } from "react";
import { ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledButton } from "../themed/StyledButton";
import { useHiddenLink } from "../../hooks/navigation/useHiddenLink";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

type FormButtonsProps = {
    productImage?: boolean;
    delay?: string;
    AdditionalButtons: FC
}

export const FormButtons: FC<FormButtonsProps> = ({
    productImage,
    delay,
    AdditionalButtons
}: FormButtonsProps): ReactElement => {
    const { hiddenRef, handleHiddenClick } = useHiddenLink();

    return (
        <Wrapper>
            <FadeInWrapper delay={delay}>
                <StyledButton content="Send it" action={handleHiddenClick} unsetShadow />
                <button className="is-hidden" ref={hiddenRef as RefObject<HTMLButtonElement>} type="submit" />
            </FadeInWrapper>

            {productImage && AdditionalButtons && <AdditionalButtons /> }
        </Wrapper>
    );
};