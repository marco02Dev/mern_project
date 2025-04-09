import { FC, ReactElement } from "react";
import { StyledTextArea } from "../themed/StyledTextArea";
import styled from "styled-components";

const Wrapper = styled.fieldset`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

type FieldSetAdditionalInfoBoxProps = {
    textArea: string
}

export const FieldSetAdditionalInfoBox: FC<FieldSetAdditionalInfoBoxProps> = ({ textArea }: FieldSetAdditionalInfoBoxProps): ReactElement => {
    return <Wrapper>
        <StyledTextArea name={textArea} />
    </ Wrapper> 
}