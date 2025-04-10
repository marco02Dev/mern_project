import { FC, ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { StyledLink } from "../themed/StyledLink";
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

const AlternativeLinkWrapper = styled.div`
    display: flex;
`;

type FormSectionProps = {
    imgSrc: string,
    title: string,
    fields: string[],
    textArea?: string,
    alternativeLink?: string,
    alternativeLinkDescription?: string
    alternativeTextLink?: string,
    service: AllowedServices
}

export const FormSection: FC<FormSectionProps> = ({title, fields, imgSrc, textArea, alternativeLink, alternativeTextLink, alternativeLinkDescription, service}: FormSectionProps): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return <StyledSection paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>

        <MainWrapper $isTablet={isTablet}>
            {!isMobile && <ImageBorderedBox imgSrc={imgSrc} /> }

            {isMobile && <StyledSpace large vertical />}

            <Form 
                title={title}
                fields={fields}
                textArea={textArea}
                service={service}
            />
        </MainWrapper>


        {alternativeLink && alternativeTextLink && alternativeLinkDescription && <>
            {/* For future releases */}
            {/* <StyledSpace large vertical />

            <AlternativeLinkWrapper>
                <StyledText content={alternativeLinkDescription} tag="h4" size="h6"/>
                <StyledLink to={alternativeLink} content={alternativeTextLink} size="h6" />
            </AlternativeLinkWrapper> */}

            </> }

        <StyledSpace small vertical/>
    </StyledSection>
}