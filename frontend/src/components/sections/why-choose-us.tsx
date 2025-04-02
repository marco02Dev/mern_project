import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledText } from "../../styles/styled-text";
import styled from "styled-components";
import { StyledSpace } from "../../styles/styled-space";
import Image from '../../../src/images/webp/signin-section.webp'
import { sizes } from "../../config/sizes.config";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";

const TextWrapper = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    width: 40%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const WhyChooseUsSection = (): ReactElement => {

    const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();

    return <StyledSection justifyCenter secondaryColor row={!isMobile && !isTablet} alignCenter={!isMobile && !isTablet} paddingLeft={sizes.spaces.medium}>

        {!isMobile && !isTablet && <ImageWrapper>
            <img src={Image} alt="Minimalist desk setup with monitor and coding posters." />
        </ImageWrapper>}

        <TextWrapper>
            <StyledText tag="h2" content="Why Choose us" minWidth={'50vh'} />
            <StyledSpace medium vertical />

            <StyledText tag="h3" content="Minimalist Design" fontWeight={'600'}/>
            <StyledSpace small vertical />
            <StyledText tag="p" content="Our layout is clean, making navigation a breeze!" />

            <StyledSpace medium vertical />

            <StyledText tag="h3" content="Minimalist Design" fontWeight={'600'}/>
            <StyledSpace small vertical />
            <StyledText tag="p" content="Courses that captivate and educate without the fluff." />

            <StyledSpace medium vertical />

            <StyledText tag="h3" content="Minimalist Design" fontWeight={'600'}/>
            <StyledSpace small vertical />
            <StyledText tag="p" content="Courses that captivate and educate without the fluff." />
        </TextWrapper>
    </StyledSection>
}