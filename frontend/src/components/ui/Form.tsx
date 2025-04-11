import styled from "styled-components";
import { ReactElement, FC, useRef } from "react";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FieldSetPersonalInfoBox } from "../boxes/FieldsetPersonalInfoBox";
import { FieldSetAdditionalInfoBox } from "../boxes/FieldsetAdditionalInfoBox";
import { login } from "../../services/login.service";
import { sendEmail } from "../../services/contact.service";
import { signUp } from "../../services/singup.service";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { AllowedServices, Service } from "../../types/service.type";


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
    .is-hidden {
        display: none;
    }
`;

type FormProps = {
    title: string;
    fields: string[];
    textArea?: string;
    service: AllowedServices;
};

export const Form: FC<FormProps> = ({
    title,
    fields,
    textArea,
    service
}: FormProps ): ReactElement => {

    let submitEvent: Service;
    if(service === "login")  {
        submitEvent = login;
    } else if(service === "send-email") {
        submitEvent = sendEmail;
    } else if(service === "sign-up") {
        submitEvent = signUp;
    }
 
    const dispatch: Dispatch = useDispatch()
    const { isMobile } = useMediaQuery();

    const hiddenLinkRef = useRef<HTMLButtonElement | null>(null);

    const handleButtonClick = () => {
        if (hiddenLinkRef.current) {
        hiddenLinkRef.current.click();
        }
    };

    return <FormWrapper $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TextRevealWrapper left >
            <StyledText tag="h2" content={title} lineHeight="h1"  />
        </TextRevealWrapper>

        <StyledSpace medium vertical />
        <form onSubmit={(event) => submitEvent(event, dispatch)}>
            <FieldSetPersonalInfoBox textArea={textArea} fields={fields}/>

            <StyledSpace small vertical/>

            {textArea ? <FieldSetAdditionalInfoBox textArea={textArea} />
            : null}
            
            <FadeInWrapper>
                <StyledSpace medium vertical/>
                <StyledButton content="Send it" action={handleButtonClick} />
                <button className="is-hidden" ref={hiddenLinkRef} type="submit"></button>
            </FadeInWrapper>
        </form>

    </FormWrapper>
}