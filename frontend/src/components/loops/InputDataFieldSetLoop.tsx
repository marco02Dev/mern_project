import { FC, ReactElement, Fragment, SetStateAction, Dispatch, useEffect, useRef } from "react";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { StyledInput } from "../themed/StyledInput";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

const Wrapper = styled.fieldset<{$isMobile: boolean}>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;  
`;

type InputDataFieldSetLoopProps = {
    textArea?: string,
    fields: string[],
    startDelay?: string,
    setInputDataFieldSetLoopLastDelay?: Dispatch<SetStateAction<string>>
}

export const InputDataFieldSetLoop: FC<InputDataFieldSetLoopProps> = ({
    textArea, 
    fields,
    startDelay,
    setInputDataFieldSetLoopLastDelay
}: InputDataFieldSetLoopProps): ReactElement => {
    let delay: string = startDelay ?? "0ms";
    const lastDelayRef = useRef<string>("0ms");
    const { isMobile }: UseMediaQuery = useMediaQuery();

    useEffect(() => {
        if (setInputDataFieldSetLoopLastDelay) {
            setInputDataFieldSetLoopLastDelay(lastDelayRef.current);
        }
    }, []);

    return (
        <Wrapper $isMobile={isMobile}>
            {fields.map((field, index): ReactElement => {
                const isEven = (index + 1) % 2 === 0;

                if (index >= 1) {
                    delay = sumStringDelays(delay, "200ms");
                    lastDelayRef.current = delay;
                }

                return (
                    <Fragment key={index}>
                        <StyledInput 
                            name={field} 
                            paddingRight={!isEven && !isMobile ? "4%" : "0%"} 
                            delay={delay}
                        />
                        {!isEven && isMobile && <StyledSpace verySmall vertical medium width="100%" />}
                        {isEven && !textArea && <StyledSpace verySmall vertical medium width="100%" />}
                    </Fragment>
                );
            })}
        </Wrapper>
    );
};
