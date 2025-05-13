import styled from "styled-components";
import { ReactElement, FC, useState, Dispatch as ReactStateDispatch, SetStateAction, FormEventHandler } from "react";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { UseMediaQuery, useMediaQuery } from "../../hooks/ui/useMediaQuery";
import { InputDataFieldSetLoop } from "../loops/InputDataFieldSetLoop";
import { FieldSetAdditionalInfoBox } from "../boxes/FieldsetAdditionalInfoBox";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { AllowedServices } from "../../types/service.type";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { colors } from "../../config/colors.config";
import { UpdateProductFormState } from "admin/src/contexts/ProductMenagementContextProvider";
import { generateFormServiceSubmitFunction } from "../../utils/form/generate-form-service-submit-function.util";
import { FormButtons } from "../buttons/FormButtons";
import { FileInputFieldSetLoop } from "../loops/FileInputFieldSetLoop";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

const Wrapper = styled.div<{
    $isMobile: boolean,
    $isTablet: boolean
    $paddingLeft: string,
    $paddingRight: string,
    $formWidth?: string
}>`
    width: ${({$isMobile, $isTablet, $formWidth}) => $isMobile || $isTablet? "100%" : $formWidth ? $formWidth : "50%"};
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
    textAreaPlaceholder?: string;
    service: AllowedServices;
    productImage?: boolean;
    formWidth?: string;
    updateProductFormState?: UpdateProductFormState;
    additionalGenerateFormServiceSubmitFunction?: Function,
    setCrateProductForm?: ReactStateDispatch<SetStateAction<boolean>>;
    setProductCreated?: ReactStateDispatch<SetStateAction<boolean>>;
    setFormImage?: ReactStateDispatch<SetStateAction<string | null>>;
    setUpdateProductFormSetState?: ReactStateDispatch<SetStateAction<UpdateProductFormState>>;
};

export const GenerateForm: FC<FormProps> = ({
    title,
    fields,
    textArea,
    textAreaPlaceholder,
    productImage,
    service,
    formWidth,
    updateProductFormState,
    additionalGenerateFormServiceSubmitFunction,
    setCrateProductForm,
    setProductCreated,
    setFormImage,
    setUpdateProductFormSetState
}: FormProps ): ReactElement => {
    const [inputDataFieldSetLoopLastDelay, setInputDataFieldSetLoopLastDelay] = useState<string>("0ms");
    const [fileInputFieldSetLoopLoopLastDelay, setFileInputFieldSetLoopLastDelay] = useState<string>("0ms");
    const [fieldSetAdditionalInfoBoxLastDelay, setFieldSetAdditionalInfoBoxLastDelay] = useState<string>("0ms");

    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [messageSent, setMessageSent] = useState< boolean | undefined>();
    const dispatch: Dispatch = useDispatch();
    const navigateFunction: NavigateFunction = useNavigate();
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    let handleSubmit: FormEventHandler<HTMLFormElement>;

    if(additionalGenerateFormServiceSubmitFunction) {
        handleSubmit = additionalGenerateFormServiceSubmitFunction({
            service,
            dispatch,
            updateProductFormState,
            setUpdateProductFormSetState,
            setErrorMessage,
            navigateFunction,
            setCrateProductForm,
            setProductCreated,
            setMessageSent,
        });
    } else {
        handleSubmit = generateFormServiceSubmitFunction({
            service: service,
            dispatch: dispatch,
            setErrorMessage: setErrorMessage,
            navigateFunction: navigateFunction,
            setMessageSent: setMessageSent,
        });
    }


    return (
        <Wrapper $formWidth={formWidth} $isTablet={isTablet} $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>

            <StyledSpace medium vertical />

            <TextRevealWrapper left delay="300ms">
                <StyledText tag="h2" content={title} lineHeight="h1" />
            </TextRevealWrapper>

            <StyledSpace medium vertical />

            {!messageSent && <>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="website" style={{ display: 'none' }} autoComplete="off" />
                    
                    <InputDataFieldSetLoop 
                        textArea={textArea} 
                        fields={fields}
                        startDelay={"300ms"} 
                        setInputDataFieldSetLoopLastDelay={setInputDataFieldSetLoopLastDelay}
                    />

                    {productImage && <> 
                        <StyledSpace medium vertical />
                        <FileInputFieldSetLoop 
                            fileFields={[
                                "product-image",
                                "hero-image"
                            ]}
                            setFormImage={setFormImage}
                            startDelay={inputDataFieldSetLoopLastDelay}
                            setFileInputFieldSetLoopLastDelay={setFileInputFieldSetLoopLastDelay}
                        />
                        <StyledSpace medium vertical />
                    </>}

                    {textArea && <> 
                        <StyledSpace small vertical />
                        <FieldSetAdditionalInfoBox 
                            textArea={textArea} 
                            placeholder={textAreaPlaceholder} 
                            delay={sumStringDelays(productImage ? fileInputFieldSetLoopLoopLastDelay : inputDataFieldSetLoopLastDelay)}
                            setFieldSetAdditionalInfoBoxLastDelay={setFieldSetAdditionalInfoBoxLastDelay}
                        />
                        <StyledSpace medium vertical />
                    </> }

                    <FormButtons 
                        productImage={productImage} 
                        setCrateProductForm={setCrateProductForm}
                        setUpdateProductFormSetState={setUpdateProductFormSetState}
                        delay={sumStringDelays(
                            productImage && textArea ? fieldSetAdditionalInfoBoxLastDelay :
                            !textArea && productImage ? fileInputFieldSetLoopLoopLastDelay :
                            inputDataFieldSetLoopLastDelay
                        )}
                    />

                    {errorMessage && <>
                        <StyledSpace medium vertical />
                        <StyledText color={colors.dark.errorMessage} tag="p" content={errorMessage} />
                    </>}
                </form>
            </>}

            {messageSent && <StyledText color={colors.dark.successMessage} tag="h5" content="Message sent successfully. Thank you!" />}

        </Wrapper>
    );
};