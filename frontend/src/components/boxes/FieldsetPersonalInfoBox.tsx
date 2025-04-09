import { FC, ReactElement, Fragment } from "react";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { StyledTextInput } from "../themed/StyledTextInput";
import { StyledSpace } from "../themed/StyledSpace";

import styled from "styled-components";

const Wrapper = styled.fieldset<{$isMobile: boolean}>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;  
`;

type FieldSetPersonalInfoBoxProps = {
    textArea?: string,
    fields: string[]
}

export const FieldSetPersonalInfoBox: FC<FieldSetPersonalInfoBoxProps> = ({textArea, fields}: FieldSetPersonalInfoBoxProps): ReactElement => {

    const { isMobile }: UseMediaQuery = useMediaQuery();

    return <Wrapper $isMobile={isMobile}>
        {fields.map((field, index): ReactElement => {
            const isEven = (index + 1) % 2 === 0;

            return <Fragment key={index}>
                <StyledTextInput name={field} paddingRight={!isEven && !isMobile ? "4%" : "0%"} />

                {!isEven && isMobile && <StyledSpace verySmall vertical medium width="100%"/> }
                {isEven && !textArea && <StyledSpace verySmall vertical medium width="100%"/> }
            </Fragment >
        })}
    </Wrapper>
}