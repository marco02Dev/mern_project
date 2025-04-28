import styled from "styled-components";
import { ReactElement, FC, useState, Dispatch as ReactStateDispatch, SetStateAction, ChangeEventHandler} from "react";
import { sizes } from "../../config/sizes.config";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { TextRevealWrapper } from "../animated/TextRevealWrapper";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { InputDataFieldSetLoop } from "../loops/InputDataFieldSetLoop";
import { FieldSetAdditionalInfoBox } from "../boxes/FieldsetAdditionalInfoBox";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { AllowedServices } from "../../types/service.type";
import { useNavigate } from "react-router-dom";
import { colors } from "../../config/colors.config";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";
import { generateFormServiceSubmitFunction } from "../../utils/form/generate-form-service-submit-function.util";
import { FormButtons } from "../buttons/FormButtons";
import { FileInputFieldSetLoop } from "../loops/FileInputFieldSetLoop";

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
    setCrateProductForm?: ReactStateDispatch<SetStateAction<boolean>>;
    setProductCreated?: ReactStateDispatch<SetStateAction<boolean>>;
    setFormImage?: ReactStateDispatch<SetStateAction<string | null>>;
    setUpdateProductFormSetState?: ReactStateDispatch<SetStateAction<UpdateProductFormContextStateObject>>;
};

export const Form: FC<FormProps> = ({
    title,
    fields,
    textArea,
    textAreaPlaceholder,
    productImage,
    service,
    formWidth,
    setCrateProductForm,
    setProductCreated,
    setFormImage,
    setUpdateProductFormSetState
}: FormProps ): ReactElement => {

    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [messageSent, setMessageSent] = useState< boolean | undefined>();
    const dispatch: Dispatch = useDispatch();
    const navigateFunction = useNavigate();
    const { isMobile, isTablet } = useMediaQuery();

    const handleSubmit = generateFormServiceSubmitFunction({
        service: service,
        dispatch: dispatch,
        setUpdateProductFormSetState: setUpdateProductFormSetState,
        setErrorMessage: setErrorMessage,
        navigateFunction: navigateFunction,
        setCrateProductForm: setCrateProductForm,
        setProductCreated: setProductCreated,
        setMessageSent: setMessageSent,
    })

    const onChangeFileAction: ChangeEventHandler<HTMLInputElement> = (event): void => {
        const file = event.target.files?.[0];   
        if(file) {
            const url = URL.createObjectURL(file);
            setFormImage && setFormImage(url);
        } else {
            return;
        }
    }

    return (
        <Wrapper $formWidth={formWidth} $isTablet={isTablet} $isMobile={isMobile} $paddingLeft={sizes.spaces.medium} $paddingRight={sizes.spaces.medium}>

            <StyledSpace medium vertical />

            <TextRevealWrapper left>
                <StyledText tag="p" largeParagraph content={title} lineHeight="h1" />
            </TextRevealWrapper>

            <StyledSpace medium vertical />

            {!messageSent && <>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="website" style={{ display: 'none' }} autoComplete="off" />
                    
                    <InputDataFieldSetLoop textArea={textArea} fields={fields} />

                    {productImage && <> 
                        <StyledSpace medium vertical />
                        <FileInputFieldSetLoop 
                            fileFields={[
                                "product-image",
                                "hero-image"
                            ]}
                            setFormImage={setFormImage}
                        />
                        <StyledSpace medium vertical />
                    </>}

                    {textArea && <> 
                        <StyledSpace small vertical />
                        <FieldSetAdditionalInfoBox textArea={textArea} placeholder={textAreaPlaceholder} />
                        <StyledSpace medium vertical />
                    </> }

                    <FormButtons 
                        productImage={productImage} 
                        setCrateProductForm={setCrateProductForm}
                        setUpdateProductFormSetState={setUpdateProductFormSetState}
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