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


const Wrapper = styled.div<{$isMobile: boolean, $borderColor: string, $paddingRight?: string}>`
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
        ${() => InputBorderStyles}
    };
`;

export type StyledTextInputProps = {
    name: string,
    paddingRight?: string
}

export const StyledTextInput: FC<StyledTextInputProps> = ({name, paddingRight}: StyledTextInputProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const capitalizeTitle: string = capitalizeFirstLetter(name);
    const { isMobile }: UseMediaQuery = useMediaQuery();

    return <Wrapper $isMobile={isMobile} $borderColor={borderColor} $paddingRight={paddingRight}>
        <label htmlFor={name}>
            <TextRevealWrapper>
                <StyledText tag="h3" size="h5" content={capitalizeTitle} />
            </TextRevealWrapper>
        </label>
        <StyledSpace verySmall vertical />
        <FadeInWrapper >
            <input type="text" id={name} name={name} />
        </FadeInWrapper>
    </Wrapper>
}