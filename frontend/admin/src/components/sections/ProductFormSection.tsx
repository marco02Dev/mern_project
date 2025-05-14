import { FC, ReactElement, useContext, useState } from "react";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { sizes } from "@shared/config/sizes.config";
import { FormLayout } from "@shared/components/layouts/FormLayout";
import { ImageBorderedBox } from "@shared/components/boxes/ImageBorderedBox";
import { AllowedServices } from "@shared/types/service.type";
import { generateAdminProductFormSubmitFunction } from "@admin/utils/generate-admin-product-form-submit-function.util";
import { ProductManagementContext, ProductManagementContextProps } from "@admin/contexts/ProductMenagementContextProvider";
import { UndoCreateUpdateProductButton } from "@admin/components/buttons/UndoCreateUpdateProductButton";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

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
    const dispatch: Dispatch = useDispatch();
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const [ formImage, setFormImage ] = useState<string | null>(null);
    const { setUpdateProductForm, setCreateProductForm, setProductCreated, updateProductForm}: ProductManagementContextProps = useContext(ProductManagementContext);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

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

            <FormLayout 
                formWidth={formWidth}
                title={title}
                fields={fields}
                textArea={textArea}
                textAreaPlaceholder={textAreaPlaceholder}
                productImage={productImage}
                handleSubmitFunction={generateAdminProductFormSubmitFunction({
                    service,
                    dispatch,
                    updateProductForm,
                    setUpdateProductForm,
                    setErrorMessage,
                    setCreateProductForm,
                    setProductCreated,
                })}
                errorMessage={errorMessage}
                setFormImage={setFormImage}
                AdditionalFormButtons={UndoCreateUpdateProductButton}
            />
        </Wrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}