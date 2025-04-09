import styled from "styled-components";
import { ReactElement, FC } from "react";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FieldSetPersonalInfoBox } from "../boxes/FieldsetPersonalInfoBox";
import { FieldSetAdditionalInfoBox } from "../boxes/FieldsetAdditionalInfoBox";


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
    };
`;

type FormProps = {
    title: string;
    fields: string[];
    textArea?: string;
};

export const Form: FC<FormProps> = ({
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
            <FieldSetPersonalInfoBox textArea={textArea} fields={fields}/>

            <StyledSpace small vertical/>

            {textArea ? <FieldSetAdditionalInfoBox textArea={textArea} />
            : null}
            
            <FadeInWrapper>
                <StyledSpace medium vertical/>
                <StyledButton content="Send it" to="none" />
            </FadeInWrapper>
        </form>

    </FormWrapper>
}