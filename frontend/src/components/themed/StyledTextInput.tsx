import { FC, ReactElement, useContext, ChangeEventHandler, useState } from "react";
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
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icone per occhio da react-icons

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

export type StyledTextInputProps = {
    name: string,
    paddingRight?: string,
    isFile?: boolean,
    onChangeAction?: ChangeEventHandler<HTMLInputElement>
}

export const StyledTextInput: FC<StyledTextInputProps> = ({
    name, 
    paddingRight, 
    isFile,
    onChangeAction
}: StyledTextInputProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color: string = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const fileBorderButtonColor = mode === "dark" ? colors.dark.borderColor : colors.light.borderColor;
    const fileButtonBackgroundColor = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const buttonColor = mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;
    const hoverColor = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
    const capitalizeTitle: string = capitalizeFirstLetter(name);
    const { isMobile }: UseMediaQuery = useMediaQuery();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Stato per la visibilità della password

    let placeholder: string | undefined;

    if(name === "tags") {
        placeholder = "Write tags separated by commas";
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev); // Cambia la visibilità della password
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
                                type={name === "password" && !isPasswordVisible ? "password" : (isFile ? "file" : "text")} 
                                id={name} 
                                name={name} 
                                placeholder={placeholder} 
                            /> 
                        :  
                            <input 
                                placeholder={placeholder} 
                                type={name === "password" && !isPasswordVisible ? "password" : (isFile ? "file" : "text")} 
                                id={name} 
                                name={name} 
                            />
                    }
                    {name === "password" && (
                        <div 
                            style={{
                                position: "absolute", 
                                right: "10px", 
                                top: "50%", 
                                transform: "translateY(-50%)", 
                                cursor: "pointer"
                            }} 
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Icona per visibilità password */}
                        </div>
                    )}
                </div>
            </FadeInWrapper>
        </Wrapper>
    );
};
