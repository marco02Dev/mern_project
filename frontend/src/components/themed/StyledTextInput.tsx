import { FC, ReactElement, useContext } from "react";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { StyledText } from "./StyledText";
import { StyledSpace } from "./StyledSpace";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter.util";
import styled, { RuleSet, css} from "styled-components";
import { sizes } from "../../config/sizes.config";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";

const InputBorderStyles: RuleSet<{$borderColor: string}> = css<{$borderColor: string}>`
    border-top: unset;
    border-left: unset;
    border-right: unset;
    border-bottom-width: 0.4vh;    
    border-color: ${({$borderColor}) => $borderColor};
`;

type inputFileStylesProps = {
    $fileButtonBackgroundColor: string, 
    $color: string,
    $hoverColor: string
    $buttonColor: string,
    $fileBorderButtonColor: string
}

const inputFileStyles: RuleSet<inputFileStylesProps> = css<inputFileStylesProps>`

    input[type="file"]::file-selector-button {
        background-color: ${({$fileButtonBackgroundColor}) => $fileButtonBackgroundColor};
        border: ${({$fileBorderButtonColor}) => $fileBorderButtonColor} solid 0.4vh;
        font-size: ${() => sizes.fontSizes.paragraph};
        color: ${({$buttonColor}) => $buttonColor};
        cursor: pointer;
        padding-top: 1vh;
        padding-bottom: 1vh;
        padding-left: 2vh;
        padding-right: 2vh;
        margin-right: 2vh;
    };

    input[type="file"]::file-selector-button:hover {
        background-color: ${({$hoverColor}) => $hoverColor};
    }
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

    ${({$isFile}) => $isFile && inputFileStyles}

`;

export type StyledTextInputProps = {
    name: string,
    paddingRight?: string,
    isFile?: boolean
}

export const StyledTextInput: FC<StyledTextInputProps> = ({name, paddingRight, isFile}: StyledTextInputProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color: string = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const fileBorderButtonColor = mode === "dark" ? colors.dark.borderColor : colors.light.borderColor;
    const fileButtonBackgroundColor = mode === "dark" ? colors.dark.buttonBackgroundColor : colors.light.buttonBackgroundColor;
    const buttonColor = mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;
    const hoverColor = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
    const capitalizeTitle: string = capitalizeFirstLetter(name);
    const { isMobile }: UseMediaQuery = useMediaQuery();

    return <Wrapper 
        $isMobile={isMobile} 
        $borderColor={borderColor} 
        $paddingRight={paddingRight} 
        $color={color} $isFile={isFile} 
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
        <FadeInWrapper >
            <input type={isFile ? "file" : "text"} id={name} name={name} />
        </FadeInWrapper>
    </Wrapper>
}