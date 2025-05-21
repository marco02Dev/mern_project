import styled from "styled-components";
import { ReactElement, useState, FC } from "react";
import { useAutoResizingTextArea, UseAutoResizingTextArea } from "@shared/hooks/ui/useAutoResizingTextArea";
import { StyledText } from "@shared/components/themed/StyledText";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { sizes } from "@shared/config/sizes.config";
import { capitalizeFirstLetter } from "@shared/utils/common/capitalize-first-letter.util";
import { InputBorderStyles } from "@shared/animations/styled-input-text-area.animation";
import { styledInpuTextAreaFocusAnimation } from "@shared/animations/styled-input-text-area.animation";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";
import { useThemeColors, ThemeColors } from "@shared/hooks/theme/useThemeColors";

const linesLimit: number = 5;

const Wrapper = styled.div<{
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
    const { textColor, hoverColor }: ThemeColors = useThemeColors();
    const textAreaCapitalized: string = capitalizeFirstLetter(name);
    const { text, rows, isMaxedOut, handleInput, handleKeyDown, textAreaRef }
    : UseAutoResizingTextArea = useAutoResizingTextArea({ lineLimit: linesLimit });

    return (
        <Wrapper 
        $inputOnFocus={inputOnFocus} 
        $hoverColor={hoverColor} 
        $borderColor={textColor} 
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
        </Wrapper>
    );
}
