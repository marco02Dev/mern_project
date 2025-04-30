import { FC, ReactElement, ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import { StyledInput } from "../themed/StyledInput";
import { StyledSpace } from "../themed/StyledSpace";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

type FileInputFieldSetLoopProps = {
    fileFields: string[];
    setFormImage?: Dispatch<SetStateAction<string | null>>,
    startDelay?: string,
    setFileInputFieldSetLoopLastDelay?: Dispatch<SetStateAction<string>>
}

const Wrapper = styled.fieldset`
    display: flex;
    flex-direction: row;
`;

export const FileInputFieldSetLoop: FC<FileInputFieldSetLoopProps> = ({
    fileFields,
    setFormImage,
    startDelay,
    setFileInputFieldSetLoopLastDelay
}: FileInputFieldSetLoopProps): ReactElement => {
    let delay: string = startDelay ?? "0ms";
    const lastDelayRef = useRef<string>("0ms");

    const onChangeAction: ChangeEventHandler<HTMLInputElement> = (event): void => {
        const file = event.target.files?.[0];   
        if (file) {
            const url = URL.createObjectURL(file);
            setFormImage?.(url);
        }
    };

    useEffect(() => {
        if (setFileInputFieldSetLoopLastDelay) {
            setFileInputFieldSetLoopLastDelay(lastDelayRef.current);
        }
        console.log("file last", lastDelayRef.current);
    }, []);

    return (
        <Wrapper>
            {fileFields.map((fieldName, index) => {
                if (index > 0) {
                    delay = sumStringDelays(delay, "200ms");
                    lastDelayRef.current = delay;
                }

                return (
                    <div key={fieldName}>
                        <StyledInput
                            name={fieldName}
                            isFile
                            onChangeAction={index === 0 ? onChangeAction : undefined}
                            delay={delay}
                        />
                        {index !== fileFields.length - 1 && <StyledSpace medium vertical />}
                    </div>
                );
            })}
        </Wrapper>
    );
};
