import { ReactElement } from "react";
import { StyledSection } from "../styled/styled-section";
import { StyledText } from "../styled/styled-text";
import { StyledButton } from "../styled/styled-button";
import styled from "styled-components";
import { StyledSpace } from "../styled/styled-space";
import Image from '../../src/assets/signin-section.webp'

const TextWrapper = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    width: 40%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const SignInSection = (): ReactElement => {
    return <StyledSection secondaryColor row alignCenter>
        <TextWrapper>
            <StyledSpace large vertical />
            <StyledText tag="p" content="Learn. Grow. Succeed." />
            <StyledSpace medium vertical />
            <StyledText tag="h2" content="Your Future Starts Here" />
            <StyledSpace medium vertical />
            <StyledText tag="p" content="Join our community of learners and elevate your skills with our expertly crafted courses. Sign up today!" />
            <StyledSpace medium vertical />

            <div>
                <StyledButton content={'Sign in'} to="/signin" />
            </div>

        </TextWrapper>

        <ImageWrapper>
            <img src={Image} alt="Minimalist desk setup with monitor and coding posters." />
        </ImageWrapper>
    </StyledSection>
}