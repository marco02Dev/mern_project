import styled from "styled-components";
import { Fragment, ReactElement } from "react";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { StyledTextArea } from "../themed/StyledTextArea";
import { StyledTextInput } from "../themed/StyledTextInput";


const FormWrapper = styled.div<{
    $isMobile: boolean,
    $paddingLeft: string,
    $paddingRight: string,

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
            &:nth-child(odd) {
                padding-right: ${({$isMobile}) => $isMobile ? "0%" : "4%"};
            };
            };
        };

        .textarea-box {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
    };
`;

type FormProps = {
    title: string;
    fields: string[];
    textArea?: string;
};

export const Form = ({
    title,
    fields,
    textArea
}: FormProps ): ReactElement => {

    const { isMobile } = useMediaQuery();

    return <FormWrapper $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TextRevealWrapper left >
            <StyledText tag="h2" content={title} lineHeight="h1"  />
        </TextRevealWrapper>

        <StyledSpace medium vertical />
        <form >
            <fieldset>
                {fields.map((field, index): ReactElement => {
                    const isEven = (index + 1) % 2 === 0;

                    return <Fragment key={index}>
                        <StyledTextInput name={field} />

                        {!isEven && isMobile && <StyledSpace verySmall vertical medium width="100%"/> }
                        {isEven && !textArea && <StyledSpace verySmall vertical medium width="100%"/> }
                    </Fragment >
                })}
            </fieldset>

            <StyledSpace small vertical/>

            {textArea ? <fieldset className="textarea-box">
                    <StyledTextArea name={textArea} />
                </ fieldset> 
            : null}
            
            <FadeInWrapper>
                <StyledSpace medium vertical/>
                <StyledButton content="Send it" to="none" />
            </FadeInWrapper>
        </form>

    </FormWrapper>
}