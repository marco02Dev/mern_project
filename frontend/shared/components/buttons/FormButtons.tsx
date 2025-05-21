import { FC, RefObject } from "react";
import { ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledButton } from "@shared/components/themed/StyledButton";
import { UseHiddenLink, useHiddenLink } from "@shared/hooks/navigation/useHiddenLink";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

type FormButtonsProps = {
    delay?: string;
    AdditionalButtons: FC
}

export const FormButtons: FC<FormButtonsProps> = ({
    delay,
    AdditionalButtons
}: FormButtonsProps): ReactElement => {
    const { hiddenRef, handleHiddenClick }: UseHiddenLink = useHiddenLink();

    return (
        <Wrapper>
            <FadeInWrapper delay={delay}>
                <StyledButton content="Send it" action={handleHiddenClick} unsetShadow />
                <button className="is-hidden" ref={hiddenRef as RefObject<HTMLButtonElement>} type="submit" />
            </FadeInWrapper>

            {AdditionalButtons && <AdditionalButtons /> }
        </Wrapper>
    );
};