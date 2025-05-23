import { FC, ReactElement, ChangeEventHandler, useState, MouseEventHandler } from "react";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";
import { StyledText } from "./StyledText";
import { StyledSpace } from "./StyledSpace";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { capitalizeFirstLetter } from "@shared/utils/common/capitalize-first-letter.util";
import styled from "styled-components";
import { sizes } from "@shared/config/sizes.config";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { getInputType } from "@shared/utils/form/get-input-type.util";
import { EyeIconButton } from "@shared/components/buttons/EyeIconButton";
import { getPasswordPatternAttrs } from "@shared/utils/form/get-password-pattern-atts";
import { InputBorderStyles } from "@shared/animations/styled-input-text-area.animation";
import { styledInpuTextAreaFocusAnimation } from "@shared/animations/styled-input-text-area.animation";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";
import { ThemeColors, useThemeColors } from "@shared/hooks/theme/useThemeColors";

const Wrapper = styled.div<{
        $isMobile: boolean, 
        $borderColor: string, 
        $paddingRight?: string, 
        $color: string, 
        $isFile?: boolean, 
        $fileButtonBackgroundColor: string,
        $fileBorderButtonColor: string,
        $hoverColor: string,
        $buttonColor: string,
        $inputOnFocus: boolean
    }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    width: ${({$isMobile}) => $isMobile ? "100%" : "48%"};
    margin-right: ${({$paddingRight}) => $paddingRight};
    position: relative;
    label {
        width: 100%;
        div {
            width: 100%;
        }
    }
    input {
        width: 100%;
        background-color: unset;
        font-size: ${() => sizes.fontSizes.h5};
        color: ${({$color}) => $color};
        padding: unset;
        ${() => InputBorderStyles}
    };

    ${() => styledInpuTextAreaFocusAnimation}

`;

export type StyledInputProps = {
    name: string,
    paddingRight?: string,
    isFile?: boolean,
    onChangeAction?: ChangeEventHandler<HTMLInputElement>,
    delay?: string
}

export const StyledInput: FC<StyledInputProps> = ({
    name, 
    paddingRight, 
    isFile,
    onChangeAction,
}: StyledInputProps): ReactElement => {
    const { textColor, hoverColor, backgroundColorButton, borderColor, backgroundColor }: ThemeColors = useThemeColors();
    const capitalizeTitle: string = capitalizeFirstLetter(name);
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [inputOnFocus, setInputOnFocus] = useState<boolean>(false);
    const passwordAttrs = getPasswordPatternAttrs(name);

    let placeholder: string | undefined;

    if(name === "tags") {
        placeholder = "Write tags separated by commas";
    }

    const togglePasswordVisibility: MouseEventHandler<HTMLDivElement> = () => {
        setIsPasswordVisible((prev) => !prev); 
    };

    return (
        <Wrapper 
            $isMobile={isMobile} 
            $borderColor={textColor} 
            $paddingRight={paddingRight} 
            $color={textColor} 
            $fileButtonBackgroundColor={backgroundColorButton}
            $hoverColor={hoverColor}
            $buttonColor={backgroundColor}
            $fileBorderButtonColor={borderColor}
            $inputOnFocus={inputOnFocus}
        >
            <label htmlFor={name}>
                <TextRevealWrapper delay={sumStringDelays("200ms")}>
                    <StyledText tag="h3" size="h5" content={capitalizeTitle} />
                </TextRevealWrapper>
            </label>
            <StyledSpace verySmall vertical />
            <FadeInWrapper delay={sumStringDelays("400ms")}>
                <div style={{ position: 'relative' }}>
                    {
                        onChangeAction ?  
                            <input 
                                onFocus={() => {
                                    setInputOnFocus(true);
                                }}
                                onBlur={() => {
                                    setInputOnFocus(false);
                                }}
                                onChange={onChangeAction} 
                                type={getInputType({ isFile, name, isPasswordVisible })} 
                                id={name} 
                                name={name} 
                                placeholder={placeholder} 
                                {...passwordAttrs}
                                required
                            /> 
                        :  
                            <input 
                                onFocus={() => setInputOnFocus(true)}
                                onBlur={() => setInputOnFocus(false)}
                                placeholder={placeholder} 
                                type={getInputType({ isFile, name, isPasswordVisible })} 
                                id={name} 
                                name={name} 
                                {...passwordAttrs}
                                required
                            />
                    }
                    {name === "password" && (
                        <EyeIconButton isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />
                    )}
                </div>
            </FadeInWrapper>
        </Wrapper>
    );
};
