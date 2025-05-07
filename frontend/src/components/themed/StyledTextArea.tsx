import styled from "styled-components";
import { ReactElement, useState, useRef, useEffect, FC } from "react";
import { StyledText } from "./StyledText";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledSpace } from "./StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { sizes } from "../../config/sizes.config";
import { capitalizeFirstLetter } from "../../utils/common/capitalize-first-letter.util";
import { InputBorderStyles } from "../../animations/styled-input-text-area.animation";
import { styledInpuTextAreaFocusAnimation } from "../../animations/styled-input-text-area.animation";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useThemeColors, ThemeColors } from "../../hooks/useThemeColors";

const linesLimit: number = 5;

const TextAreaWrapper = styled.div<{
    $textColor: string,
    $borderColor: string, 
    $hoverColor: string,
    $inputOnFocus: boolean
}>`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    display: flex;
    textarea {
        color: ${({$textColor}) => $textColor};
        background-color: unset;
        font-size: ${() => sizes.fontSizes.h5};
        ${() => InputBorderStyles}    
        width: 100%;
        overflow-y: hidden;
        resize: none;
        white-space: pre-wrap;
        word-wrap: break-word; 
        padding: unset;
    }  

    ${() => styledInpuTextAreaFocusAnimation}
`;

type StyledTextAreaProps = {
    name: string,
    placeholder?: string,
    startDelay?: string
}

export const StyledTextArea: FC<StyledTextAreaProps> = ({ 
    name, 
    placeholder, 
    startDelay 
}: StyledTextAreaProps): ReactElement => {
    const [inputOnFocus, setInputOnFocus] = useState<boolean>(false);
    const { textColor, borderColor, hoverColor }: ThemeColors = useThemeColors();

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
        <TextAreaWrapper 
        $inputOnFocus={inputOnFocus} 
        $hoverColor={hoverColor} 
        $borderColor={borderColor} 
        $textColor={textColor}
        >
            <label htmlFor={name}>
                <TextRevealWrapper delay={sumStringDelays(startDelay, "200ms")}>
                    <StyledText tag="h3" size="h5" content={textAreaCapitalized} />
                </TextRevealWrapper>
            </label>

            <StyledSpace verySmall vertical />

            <FadeInWrapper delay={sumStringDelays(startDelay, "400ms")}>
                <textarea
                    placeholder={placeholder}
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
                    onFocus={() => {
                        setInputOnFocus(true);
                    }}
                    onBlur={() => {
                        setInputOnFocus(false);
                    }}
                    required
                />
            </FadeInWrapper>
        </TextAreaWrapper>
    );
}
