import { FC, ReactElement, Fragment } from "react";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { StyledInput } from "../themed/StyledInput";
import { StyledSpace } from "../themed/StyledSpace";

import styled from "styled-components";

const Wrapper = styled.fieldset<{$isMobile: boolean}>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;  
`;

type InputDataFieldSetLoopProps = {
    textArea?: string,
    fields: string[]
}

export const InputDataFieldSetLoop: FC<InputDataFieldSetLoopProps> = ({textArea, fields}: InputDataFieldSetLoopProps): ReactElement => {

    const { isMobile }: UseMediaQuery = useMediaQuery();

    return <Wrapper $isMobile={isMobile}>
        {fields.map((field, index): ReactElement => {
            const isEven = (index + 1) % 2 === 0;

            return <Fragment key={index}>
                <StyledInput name={field} paddingRight={!isEven && !isMobile ? "4%" : "0%"} />

                {!isEven && isMobile && <StyledSpace verySmall vertical medium width="100%"/> }
                {isEven && !textArea && <StyledSpace verySmall vertical medium width="100%"/> }
            </Fragment >
        })}
    </Wrapper>
}