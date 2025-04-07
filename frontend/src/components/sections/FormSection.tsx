import { Fragment, ReactElement, useContext } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledButton } from "../themed/StyledButton";
import styled, { css, RuleSet } from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter.util";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { StyledLink } from "../themed/StyledLink";

const ImageWrapper = styled.div<{$isMobile: boolean}>`
    width: ${({$isMobile}) => $isMobile ? '100%' : '50%'};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 65%;

    }
`;

const InputBorderStyles: RuleSet<{$borderColor: string}> = css<{$borderColor: string}>`
    border-top: unset;
    border-left: unset;
    border-right: unset;
    border-bottom-width: 0.4vh;    
    border-color: ${({$borderColor}) => $borderColor};
`;

const FormWrapper = styled.div<{
        $isMobile: boolean,
        $paddingLeft: string,
        $paddingRight: string,
        $borderColor: string
    }>`
    width: ${({$isMobile}) => $isMobile ? "100%" : "50%"};
    height: 100%;
    padding-left: ${({$paddingLeft, $isMobile}) => $paddingLeft && !$isMobile ? $paddingLeft : "unset"};
    padding-right: ${({$paddingRight, $isMobile}) => $paddingRight && !$isMobile ? $paddingRight : "unset"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    form {
        width: 100%;
        fieldset:first-child {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            div {
                width: 100%;
            display: flex;
            flex-direction: column;
            width: ${({$isMobile}) => $isMobile ? "100%" : "48%"};
                input {
                    width: 200%;
                    background-color: unset;
                    font-size: ${() => sizes.fontSizes.h5};
                    ${() => InputBorderStyles}
                };

                &:first-child {
                    padding-right: 4%;
                };
            };
        };

        fieldset:last-child {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            div {
            display: flex;
            flex-direction: column;
            width: 100%;
                textarea {
                    background-color: unset;
                    font-size: ${() => sizes.fontSizes.h5};
                    ${() => InputBorderStyles}        
                }
            }
        }

    };
`;

const AlternativeLinkWrapper = styled.div`

`;

type FormSectionProps = {
    imgSrc: string,
    title: string,
    fields: string[],
    textArea?: string,
    alternativeLink?: string,
    alternativeLinkDescription?: string
    alternativeTextLink?: string
}

export const FormSection = ({title, fields, imgSrc, textArea, alternativeLink, alternativeTextLink, alternativeLinkDescription}: FormSectionProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;
    const { isMobile } = useMediaQuery();
    let textAreaCapitalized: string | undefined;

    if(textArea) {
        textAreaCapitalized = capitalizeFirstLetter(textArea);
    }

    return <StyledSection secondaryColor row={!isMobile} paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>

        <ImageWrapper $isMobile={isMobile}>
            <StyledSpace large vertical />
            <FadeInWrapper>
                <img src={imgSrc} alt="" />
            </FadeInWrapper>
        </ImageWrapper> 

        {isMobile && <StyledSpace large vertical />}

        <FormWrapper $borderColor={borderColor} $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>
            <StyledSpace medium vertical />

            <TextRevealWrapper left >
                <StyledText tag="h2" content={title}  />
            </TextRevealWrapper>

            <StyledSpace medium vertical />
            <form>
                <fieldset>
                    {fields.map((field, index): ReactElement => {

                        const capitalizeTitle: string = capitalizeFirstLetter(field);

                        return <Fragment key={index}>
                            <div>
                                <label htmlFor={field}>
                                    <TextRevealWrapper>
                                        <StyledText tag="h3" size="h5" content={capitalizeTitle} />
                                    </TextRevealWrapper>
                                </label>
                                <StyledSpace verySmall vertical />
                                <FadeInWrapper >
                                    <input type="text" id={field} name={field} />
                                </FadeInWrapper>

                            </div>
                        </Fragment >
                    })}
                </fieldset>

                <StyledSpace large vertical/>

                {textArea && textAreaCapitalized ? <fieldset>
                        <div>
                            <label htmlFor={textArea}>
                                <TextRevealWrapper>
                                    <StyledText tag="h3" size="h5" content={textAreaCapitalized} />
                                </TextRevealWrapper>
                            </label>
                            <FadeInWrapper>
                                <textarea />
                            </FadeInWrapper>
                        </div>
                    </ fieldset> 
                : null}
            </form>

            <StyledSpace small vertical/>

            <FadeInWrapper>
                <StyledButton content="Send it" to="none" />
            </FadeInWrapper>

            {alternativeLink && alternativeTextLink && alternativeLinkDescription && <>
                <StyledSpace large vertical />

                <AlternativeLinkWrapper>
                    <TextRevealWrapper left>
                        <StyledText content={alternativeLinkDescription} tag="h4" size="h6"/>
                    </TextRevealWrapper>
                    <StyledSpace verySmall vertical />
                    <StyledLink to={alternativeLink} content={alternativeTextLink} size="span" />
                </AlternativeLinkWrapper>
            </> }

        </FormWrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}