import { FC, ReactElement } from "react";
import { StyledTextArea } from "../themed/StyledTextArea";
import styled from "styled-components";

const Wrapper = styled.fieldset`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

type FieldSetAdditionalInfoBoxProps = {
    textArea: string,
    placeholder?: string
}

export const FieldSetAdditionalInfoBox: FC<FieldSetAdditionalInfoBoxProps> = ({ textArea, placeholder }: FieldSetAdditionalInfoBoxProps): ReactElement => {
    return <Wrapper>
        <StyledTextArea name={textArea} placeholder={placeholder} />
    </ Wrapper> 
}