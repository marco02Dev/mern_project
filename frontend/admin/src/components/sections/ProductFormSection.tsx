import { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import { StyledSection } from "../../../../main/src/components/themed/StyledSection";
import { StyledSpace } from "../../../../main/src/components/themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "../../../../main/src/hooks/ui/useMediaQuery";
import { sizes } from "../../../../main/src/config/sizes.config";
import { GenerateForm } from "../../../../main/src/components/forms/GenerateForm";
import { ImageBorderedBox } from "../../../../main/src/components/boxes/ImageBorderedBox";
import { AllowedServices } from "../../../../main/src/types/service.type";
import { UpdateProductFormContextStateObject } from "../../contexts/UpdateProductFormProvider";
import { generateAdminProductFormSubmitFunction } from "../../utils/generate-admin-product-form-submit-function.util";

const Wrapper = styled.div<{$isTablet: boolean}>`
    display: flex;
    flex-direction: ${({$isTablet}) => $isTablet ? "column" : "row"};
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

type ProductFormSectionProps = {
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
    updateProductFormState?: UpdateProductFormContextStateObject,
    setCrateProductForm?: Dispatch<SetStateAction<boolean>>,
    setProductCreated?: Dispatch<SetStateAction<boolean>>,
    setUpdateProductFormSetState?: Dispatch<SetStateAction<UpdateProductFormContextStateObject>>
}

export const ProductFormSection: FC<ProductFormSectionProps> = ({
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
    updateProductFormState,
    setCrateProductForm, 
    setProductCreated,
    setUpdateProductFormSetState
}: ProductFormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const [ formImage, setFormImage ] = useState<string | null>(null);

    return <StyledSection 
        id={`${service}-form-section`} 
        secondaryColor={secondaryColor} 
        paddingRight={sizes.spaces.small} 
        paddingLeft={sizes.spaces.small}
        >

        <Wrapper $isTablet={isTablet}>
            {isTablet && <StyledSpace large vertical />}

            {!isMobile && <ImageBorderedBox boxWidth={imageBorderedBoxWidth} imgSrc={formImage ? formImage : imgSrc} /> }

            {isMobile && <StyledSpace large vertical />}

            <GenerateForm 
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
                updateProductFormState={updateProductFormState}
                additionalGenerateFormServiceSubmitFunction={generateAdminProductFormSubmitFunction}
            />
        </Wrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}