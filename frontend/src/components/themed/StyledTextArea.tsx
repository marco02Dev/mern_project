import styled, { RuleSet, css } from "styled-components";
import { ReactElement, useContext, useState, useRef, useEffect } from "react";
import { StyledText } from "./StyledText";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledSpace } from "./StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { sizes } from "../../config/sizes.config";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter.util";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";

const linesLimit: number = 5;

const InputBorderStyles: RuleSet<{$borderColor: string}> = css<{$borderColor: string}>`
    border-top: unset;
    border-left: unset;
    border-right: unset;
    border-bottom-width: 0.4vh;    
    border-color: ${({$borderColor}) => $borderColor};
`;

const TextAreaWrapper = styled.div<{$borderColor: string}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    textarea {
        background-color: unset;
        font-size: ${() => sizes.fontSizes.h5};
        ${() => InputBorderStyles}    
        width: 100%;
        overflow-y: hidden;
        resize: none;
        white-space: pre-wrap;
        word-wrap: break-word; 
    }  
`;

type StyledTextAreaProps = {
    name: string
}

export const StyledTextArea = ({ name }: StyledTextAreaProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    let textAreaCapitalized: string = capitalizeFirstLetter(name);

    const [text, setText] = useState('');
    const [rows, setRows] = useState(1);
    const [isMaxedOut, setIsMaxedOut] = useState(false); 
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isMaxedOut) return; 

        const inputText = e.target.value;
        const lineCount = inputText.split('\n').length;

        if (lineCount <= linesLimit) {
            setText(inputText);
            setRows(lineCount);
        } else {
            setIsMaxedOut(true);
        }
    };

    const autoResize = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";  
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; 
        }
    };

    useEffect(() => {
        autoResize();
    }, [text]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const lineCount = text.split('\n').length;

        if (lineCount >= linesLimit && e.key === 'Enter') {
            e.preventDefault(); 
        }
    };

    return (
        <TextAreaWrapper $borderColor={borderColor}>
            <label htmlFor={name}>
                <TextRevealWrapper>
                    <StyledText tag="h3" size="h5" content={textAreaCapitalized} />
                </TextRevealWrapper>
            </label>

            <StyledSpace verySmall vertical />

            <FadeInWrapper>
                <textarea
                    ref={textAreaRef}
                    rows={rows}
                    name={name}
                    id={name}
                    value={text}
                    onInput={handleInput}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown} 
                    wrap="soft"
                    disabled={isMaxedOut} 
                />
            </FadeInWrapper>
        </TextAreaWrapper>
    );
}
