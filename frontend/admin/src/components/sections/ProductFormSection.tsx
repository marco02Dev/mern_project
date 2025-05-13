import { FC, ReactElement, useContext, useState } from "react";
import { StyledSection } from "@client/components/themed/StyledSection";
import { StyledSpace } from "@client/components/themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "@client/hooks/ui/useMediaQuery";
import { sizes } from "@client/config/sizes.config";
import { GenerateForm } from "@client/components/forms/GenerateForm";
import { ImageBorderedBox } from "@client/components/boxes/ImageBorderedBox";
import { AllowedServices } from "@client/types/service.type";
import { generateAdminProductFormSubmitFunction } from "../../utils/generate-admin-product-form-submit-function.util";
import { ProductManagementContext, ProductManagementContextProps } from "../../contexts/ProductMenagementContextProvider";

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
}: ProductFormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const [ formImage, setFormImage ] = useState<string | null>(null);
    const { setUpdateProductForm, setCreateProductForm, setProductCreated, updateProductForm}: ProductManagementContextProps = useContext(ProductManagementContext);

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
                setCrateProductForm={setCreateProductForm}
                setProductCreated={setProductCreated}
                setFormImage={setFormImage}
                setUpdateProductFormSetState={setUpdateProductForm}
                updateProductFormState={updateProductForm}
                additionalGenerateFormServiceSubmitFunction={generateAdminProductFormSubmitFunction}
            />
        </Wrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}