import { FC, ReactElement, useState } from "react";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { sizes } from "@shared/config/sizes.config";
import { FormLayout } from "@shared/components/layouts/FormLayout";
import { ImageBorderedBox } from "@shared/components/boxes/ImageBorderedBox";
import { AllowedServices } from "@shared/types/service.type";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { generateClientFormServiceSubmitFunction } from "@client/util/generate-form-service-submit-function.util";

const Wrapper = styled.div<{$isTablet: boolean}>`
    display: flex;
    flex-direction: ${({$isTablet}) => $isTablet ? "column" : "row"};
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

type ClientFormSectionProps = {
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

export const ClientFormSection: FC<ClientFormSectionProps> = ({
    title, 
    fields, 
    imgSrc, 
    imageBorderedBoxWidth, 
    textArea, 
    textAreaPlaceholder,
    service, 
    formWidth , 
    secondaryColor
}: ClientFormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const dispatch: Dispatch = useDispatch();
    const navigateFunction: NavigateFunction = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [messageSent, setMessageSent] = useState< boolean | undefined>();

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

            <FormLayout  
                formWidth={formWidth}
                title={title}
                fields={fields}
                textArea={textArea}
                textAreaPlaceholder={textAreaPlaceholder}
                service={service}
                removeForm={messageSent}
                errorMessage={errorMessage}
                handleSubmitFunction={generateClientFormServiceSubmitFunction({
                    service: service,
                    dispatch: dispatch,
                    setErrorMessage: setErrorMessage,
                    navigateFunction: navigateFunction,
                    setMessageSent: setMessageSent,
                })}
            />
        </Wrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}