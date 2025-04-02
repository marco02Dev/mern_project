import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledText } from "../../styles/styled-text";
import { StyledButton } from "../../styles/styled-button";
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

export const SignInSection = (): ReactElement => {

    const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();

    return <StyledSection justifyCenter secondaryColor row={!isMobile && !isTablet} alignCenter={!isMobile && !isTablet} paddingLeft={sizes.spaces.medium}>
        <TextWrapper>
            <StyledSpace large vertical />
            <StyledText tag="p" content="Learn. Grow. Succeed." fontWeight={'600'}/>
            <StyledSpace medium vertical />
            <StyledText tag="h2" content="Your Future Starts Here" minWidth={'50vh'} />
            <StyledSpace small vertical />
            <StyledText tag="p" content="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!" />
            <StyledSpace medium vertical />

            <div>
                <StyledButton content={'Sign in'} to="/signin" />
            </div>

        </TextWrapper>

        {!isMobile && !isTablet && <ImageWrapper>
            <img src={Image} alt="Minimalist desk setup with monitor and coding posters." />
        </ImageWrapper>}

    </StyledSection>
}