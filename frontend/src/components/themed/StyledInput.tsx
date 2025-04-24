import { FC, ReactElement, useContext, ChangeEventHandler, useState, MouseEventHandler } from "react";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledText } from "./StyledText";
import { StyledSpace } from "./StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter.util";
import styled, { RuleSet, css } from "styled-components";
import { sizes } from "../../config/sizes.config";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { getInputType } from "../../utils/get-input-type.util";
import { EyeIconButton } from "../ui/EyeIconButton";
import { getPasswordPatternAttrs } from "../../utils/get-password-pattern-atts";

const InputBorderStyles: RuleSet<{$borderColor: string}> = css<{$borderColor: string}>`
    border-top: unset;
    border-left: unset;
    border-right: unset;
    border-bottom-width: 0.4vh;    
    border-color: ${({$borderColor}) => $borderColor};
`;

const Wrapper = styled.div<{
        $isMobile: boolean, 
        $borderColor: string, 
        $paddingRight?: string, 
        $color: string, 
        $isFile?: boolean, 
        $fileButtonBackgroundColor: string,
        $fileBorderButtonColor: string,
        $hoverColor: string,
        $buttonColor: string
    }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    width: ${({$isMobile}) => $isMobile ? "100%" : "48%"};
    padding-right: ${({$paddingRight}) => $paddingRight};
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
        ${() => InputBorderStyles}
    };
`;

export type StyledInputProps = {
    name: string,
    paddingRight?: string,
    isFile?: boolean,
    onChangeAction?: ChangeEventHandler<HTMLInputElement>
}

export const StyledInput: FC<StyledInputProps> = ({
    name, 
    paddingRight, 
    isFile,
    onChangeAction
}: StyledInputProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color: string = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const fileBorderButtonColor = mode === "dark" ? colors.dark.borderColor : colors.light.borderColor;
    const fileButtonBackgroundColor = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const buttonColor = mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;
    const hoverColor = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
    const capitalizeTitle: string = capitalizeFirstLetter(name);
    const { isMobile }: UseMediaQuery = useMediaQuery();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            $borderColor={borderColor} 
            $paddingRight={paddingRight} 
            $color={color} 
            $fileButtonBackgroundColor={fileButtonBackgroundColor}
            $hoverColor={hoverColor}
            $buttonColor={buttonColor}
            $fileBorderButtonColor={fileBorderButtonColor}
        >
            <label htmlFor={name}>
                <TextRevealWrapper>
                    <StyledText tag="h3" size="h5" content={capitalizeTitle} />
                </TextRevealWrapper>
            </label>
            <StyledSpace verySmall vertical />
            <FadeInWrapper>
                <div style={{ position: 'relative' }}>
                    {
                        onChangeAction ?  
                            <input 
                                onChange={onChangeAction} 
                                type={getInputType({ isFile, name, isPasswordVisible })} 
                                id={name} 
                                name={name} 
                                placeholder={placeholder} 
                                {...passwordAttrs}
                            /> 
                        :  
                            <input 
                                placeholder={placeholder} 
                                type={getInputType({ isFile, name, isPasswordVisible })} 
                                id={name} 
                                name={name} 
                                {...passwordAttrs}
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
