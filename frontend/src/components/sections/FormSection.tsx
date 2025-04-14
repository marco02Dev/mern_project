import { FC, ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { Form } from "../ui/Form";
import { ImageBorderedBox } from "../boxes/ImageBorderedBox";
import { AllowedServices } from "../../types/service.type";

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
    title: string,
    fields: string[],
    textArea?: string,
    service: AllowedServices
}

export const FormSection: FC<FormSectionProps> = ({title, fields, imgSrc, textArea, service}: FormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return <StyledSection paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>

        <MainWrapper $isTablet={isTablet}>
            {isTablet && <StyledSpace large vertical />}

            {!isMobile && <ImageBorderedBox imgSrc={imgSrc} /> }

            {isMobile && <StyledSpace large vertical />}

            <Form 
                title={title}
                fields={fields}
                textArea={textArea}
                service={service}
            />
        </MainWrapper>

        <StyledSpace small vertical/>
    </StyledSection>
}