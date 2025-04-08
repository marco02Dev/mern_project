import { ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledLink } from "../themed/StyledLink";
import { Form } from "../ui/Form";

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const ImageWrapper = styled.div<{$isMobile: boolean}>`
    width: ${({$isMobile}) => $isMobile ? '100%' : '50%'};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
            height: 85%;
            object-fit: cover;
        }
    }

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
    alternativeTextLink?: string
}

export const FormSection = ({title, fields, imgSrc, textArea, alternativeLink, alternativeTextLink, alternativeLinkDescription}: FormSectionProps): ReactElement => {
    const { isMobile } = useMediaQuery();

    return <StyledSection secondaryColor  paddingRight={sizes.spaces.small} paddingLeft={sizes.spaces.small}>

        <MainWrapper>
            {!isMobile && <ImageWrapper $isMobile={isMobile}>
                <StyledSpace large vertical />
                <FadeInWrapper>
                    <img src={imgSrc} alt="" />
                </FadeInWrapper>
            </ImageWrapper> }

            {isMobile && <StyledSpace large vertical />}

            <Form 
                title={title}
                fields={fields}
                textArea={textArea}
            />
        </MainWrapper>


        {alternativeLink && alternativeTextLink && alternativeLinkDescription && <>
                <StyledSpace large vertical />

                <AlternativeLinkWrapper>
                    <StyledText content={alternativeLinkDescription} tag="h4" size="h6"/>
                    <StyledLink to={alternativeLink} content={alternativeTextLink} size="h6" />
                </AlternativeLinkWrapper>

            </> }

        <StyledSpace small vertical/>
    </StyledSection>
}