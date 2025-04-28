import { FC, ReactElement, ChangeEventHandler, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { StyledInput } from "../themed/StyledInput";
import { StyledSpace } from "../themed/StyledSpace";

type FileInputFieldSetLoopProps = {
    fileFields: string[];
    setFormImage?: Dispatch<SetStateAction<string | null>>
}

const FileInputFieldset = styled.fieldset`
    display: flex;
    flex-direction: row;
`;

export const FileInputFieldSetLoop: FC<FileInputFieldSetLoopProps> = ({
    fileFields,
    setFormImage
}: FileInputFieldSetLoopProps): ReactElement => {

    const onChangeFileAction: ChangeEventHandler<HTMLInputElement> = (event): void => {
        const file = event.target.files?.[0];   
        if(file) {
            const url = URL.createObjectURL(file);
            setFormImage && setFormImage(url);
        } else {
            return;
        }
    }

    return (
        <FileInputFieldset>
            {fileFields.map((fieldName, index) => (
                <div key={fieldName}>
                    <StyledInput
                        name={fieldName}
                        isFile
                        onChangeAction={index === 0 ? onChangeFileAction : undefined}
                    />
                    {index !== fileFields.length - 1 && <StyledSpace medium vertical />}
                </div>
            ))}
        </FileInputFieldset>
    );
};
