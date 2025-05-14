import { FC, ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "../../hooks/ui/useMediaQuery";
import { sizes } from "@shared/config/sizes.config";
import { GenerateForm } from "../layouts/FormLayout";
import { ImageBorderedBox } from "../boxes/ImageBorderedBox";
import { AllowedServices } from "@shared/types/service.type";

const Wrapper = styled.div<{$isTablet: boolean}>`
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
    secondaryColor
}: FormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return <StyledSection 
        id={`${service}-form-section`} 
        secondaryColor={secondaryColor} 
        paddingRight={sizes.spaces.small} 
        paddingLeft={sizes.spaces.small}
        >

        <Wrapper $isTablet={isTablet}>
            {isTablet && <StyledSpace large vertical />}

            {!isMobile && <ImageBorderedBox boxWidth={imageBorderedBoxWidth} imgSrc={imgSrc} /> }

            {isMobile && <StyledSpace large vertical />}

            <GenerateForm 
                formWidth={formWidth}
                title={title}
                fields={fields}
                textArea={textArea}
                textAreaPlaceholder={textAreaPlaceholder}
                service={service}
            />
        </Wrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}