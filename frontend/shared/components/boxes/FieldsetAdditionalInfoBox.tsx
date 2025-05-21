import { FC, ReactElement, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { StyledTextArea } from "@shared/components/themed/StyledTextArea";
import styled from "styled-components";

const Wrapper = styled.fieldset`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

type FieldSetAdditionalInfoBoxProps = {
    textArea: string;
    placeholder?: string;
    delay?: string;
    setFieldSetAdditionalInfoBoxLastDelay?: Dispatch<SetStateAction<string>>;
};

export const FieldSetAdditionalInfoBox: FC<FieldSetAdditionalInfoBoxProps> = ({
    textArea,
    placeholder,
    delay = "0ms",
    setFieldSetAdditionalInfoBoxLastDelay,
}: FieldSetAdditionalInfoBoxProps): ReactElement => {
    const lastDelayRef = useRef<string>(delay);

    useEffect(() => {
        setFieldSetAdditionalInfoBoxLastDelay?.(lastDelayRef.current);
    }, []);

    return (
        <Wrapper>
            <StyledTextArea name={textArea} placeholder={placeholder} startDelay={delay} />
        </Wrapper>
    );
};