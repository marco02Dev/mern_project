import { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { Form } from "../ui/Form";
import { ImageBorderedBox } from "../boxes/ImageBorderedBox";
import { AllowedServices } from "../../types/service.type";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";

const MainWrapper = styled.div<{$isTablet: boolean}>`
    display: flex;
    flex-direction: ${({$isTablet}) => $isTablet ? "column" : "row"};
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

type FormSectionProps = {
    imgSrc: string,
    imageBorderedBoxWidth?: string,
    formWidth?: string,
    title: string,
    fields: string[],
    textArea?: string,
    textAreaPlaceholder?: string,
    service: AllowedServices,
    secondaryColor?: boolean,
    productImage?: boolean,
    setCrateProductForm?: Dispatch<SetStateAction<boolean>>,
    setProductCreated?: Dispatch<SetStateAction<boolean>>,
    setUpdateProductFormSetState?: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>
}

export const FormSection: FC<FormSectionProps> = ({
    title, 
    fields, 
    imgSrc, 
    imageBorderedBoxWidth, 
    textArea, 
    textAreaPlaceholder,
    service, 
    formWidth , 
    secondaryColor, 
    productImage, 
    setCrateProductForm, 
    setProductCreated,
    setUpdateProductFormSetState
}: FormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const [ formImage, setFormImage ] = useState<string | null>(null);

    return <StyledSection id={`${service}-form-section`} secondaryColor={secondaryColor} paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>

        <MainWrapper $isTablet={isTablet}>
            {isTablet && <StyledSpace large vertical />}

            {!isMobile && <ImageBorderedBox boxWidth={imageBorderedBoxWidth} imgSrc={formImage ? formImage : imgSrc} /> }

            {isMobile && <StyledSpace large vertical />}

            <Form 
                formWidth={formWidth}
                title={title}
                fields={fields}
                textArea={textArea}
                textAreaPlaceholder={textAreaPlaceholder}
                service={service}
                productImage={productImage}
                setCrateProductForm={setCrateProductForm}
                setProductCreated={setProductCreated}
                setFormImage={setFormImage}
                setUpdateProductFormSetState={setUpdateProductFormSetState}
            />
        </MainWrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}