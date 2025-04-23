import styled from "styled-components";
import { ReactElement, FC, useRef, useState, FormEvent, Dispatch as ReactStateDispatch, SetStateAction} from "react";
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
import { createCourseService } from "../../services/create-course.service";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { AllowedServices } from "../../types/service.type";
import { useNavigate } from "react-router-dom";
import { colors } from "../../config/colors.config";
import { StyledTextInput } from "../themed/StyledTextInput";

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

const FileInputFieldset = styled.fieldset`
    display: flex;
    flex-direction: row;
`;

type FormProps = {
    title: string;
    fields: string[];
    textArea?: string;
    service: AllowedServices;
    productImage?: boolean;
    setCrateProductForm?: ReactStateDispatch<SetStateAction<boolean>>;
    setProductCreated?: ReactStateDispatch<SetStateAction<boolean>>
};

export const Form: FC<FormProps> = ({
    title,
    fields,
    textArea,
    productImage,
    service,
    setCrateProductForm,
    setProductCreated
}: FormProps ): ReactElement => {

    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [messageSent, setMessageSent] = useState< boolean | undefined>();
    const dispatch: Dispatch = useDispatch();
    const navigateFunction = useNavigate();
    const { isMobile, isTablet } = useMediaQuery();
    const hiddenLinkRef = useRef<HTMLButtonElement | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (service === "send-email") {
            sendEmail(event, setErrorMessage, setMessageSent);
        } else if (service === "login") {
            loginService(event, dispatch, navigateFunction, setErrorMessage);
        } else if (service === "sign-up") {
            signUpService(event, dispatch, navigateFunction, setErrorMessage);
        } else if(service === "create-course" && setCrateProductForm && setProductCreated) {
            createCourseService(event, setErrorMessage, setCrateProductForm, setProductCreated);
        }
    };

    const handleButtonClick = () => {
        hiddenLinkRef.current?.click();
    };

    return (
        <FormWrapper $isTablet={isTablet} $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>

            <StyledSpace medium vertical />

            <TextRevealWrapper left>
                <StyledText tag="p" largeParagraph content={title} lineHeight="h1" />
            </TextRevealWrapper>

            <StyledSpace medium vertical />

            {!messageSent && <>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="website" style={{ display: 'none' }} autoComplete="off" />
                    
                    <FieldSetPersonalInfoBox textArea={textArea} fields={fields} />

                    {productImage && <> 
                        <FileInputFieldset> 
                            <StyledTextInput name="product-image" isFile /> 
                            <StyledSpace medium vertical />
                            <StyledTextInput name="hero-image" isFile /> 
                        </ FileInputFieldset> 
                        <StyledSpace medium vertical />
                    </>}

                    {textArea && <StyledSpace small vertical />}
                    {textArea && <FieldSetAdditionalInfoBox textArea={textArea} />}
                    {textArea && <StyledSpace medium vertical />}

                    <FadeInWrapper>
                        <StyledButton content="Send it" action={handleButtonClick} unsetShadow />
                        <button className="is-hidden" ref={hiddenLinkRef} type="submit" />
                    </FadeInWrapper>

                    {errorMessage && <StyledSpace medium vertical />}
                    {errorMessage && (
                        <StyledText color={colors.dark.errorMessage} tag="p" content={errorMessage} />
                    )}
                </form>
            </>}

            {messageSent && <StyledText color={colors.dark.successMessage} tag="h5" content="Message sent successfully. Thank you!" />}

        </FormWrapper>
    );
};