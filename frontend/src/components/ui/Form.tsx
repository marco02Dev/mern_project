import styled from "styled-components";
import { ReactElement, FC, useRef, useState } from "react";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { StyledButton } from "../themed/StyledButton";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FieldSetPersonalInfoBox } from "../boxes/FieldsetPersonalInfoBox";
import { FieldSetAdditionalInfoBox } from "../boxes/FieldsetAdditionalInfoBox";
import { loginService } from "../../services/login.service";
import { sendEmail } from "../../services/contact.service";
import { signUpService } from "../../services/singup.service";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { AllowedServices, FormService, Service } from "../../types/service.type";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { colors } from "../../config/colors.config";

const FormWrapper = styled.div<{
    $isMobile: boolean,
    $isTablet: boolean
    $paddingLeft: string,
    $paddingRight: string,

}>`
    width: ${({$isMobile, $isTablet}) => $isMobile || $isTablet? "100%" : "50%"};
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

    let submitEvent: Service | FormService;
    let navigateFunction: NavigateFunction | undefined;
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    if(service === "login")  {
        submitEvent = loginService;
    } else if(service === "send-email") {
        submitEvent = sendEmail;
    } else if(service === "sign-up") {
        submitEvent = signUpService;
    }

    if(service === "login" || service === "sign-up") {
        navigateFunction = useNavigate();
    }
 
    const dispatch: Dispatch = useDispatch()
    const { isMobile, isTablet } = useMediaQuery();

    const hiddenLinkRef = useRef<HTMLButtonElement | null>(null);

    const handleButtonClick = () => {
        if (hiddenLinkRef.current) {
        hiddenLinkRef.current.click();
        }
    };

    return <FormWrapper $isTablet={isTablet} $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TextRevealWrapper left >
            <StyledText tag="h2" content={title} lineHeight="h1"  />
        </TextRevealWrapper>

        <StyledSpace medium vertical />
        <form onSubmit={(event) => submitEvent(event, dispatch, navigateFunction, setErrorMessage)}>
            <FieldSetPersonalInfoBox textArea={textArea} fields={fields}/>

            {textArea && <StyledSpace small vertical/>}

            {textArea ? <FieldSetAdditionalInfoBox textArea={textArea} />
            : null}

            {textArea && <StyledSpace medium vertical/>}
            
            <FadeInWrapper>
                <StyledButton content="Send it" action={handleButtonClick} unsetShadow/>
                <button className="is-hidden" ref={hiddenLinkRef} type="submit"></button>
            </FadeInWrapper>

            {errorMessage && <StyledSpace medium vertical />}
            {errorMessage && <StyledText color={colors.dark.errorMessage} tag="p" content={errorMessage} />}
        </form>

    </FormWrapper>
}