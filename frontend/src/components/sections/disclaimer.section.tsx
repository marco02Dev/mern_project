import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledText } from "../../styles/styled-text";
import styled from "styled-components";
import { StyledSpace } from "../../styles/styled-space";
import Image from "../../../src/images/webp/signin-section.webp";
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

export const DisclaimerSection = (): ReactElement => {
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    return (
        <StyledSection justifyCenter secondaryColor row={!isMobile && !isTablet} alignCenter={!isMobile && !isTablet} paddingLeft={sizes.spaces.medium}>
            <TextWrapper>
                <StyledSpace large vertical />
                <StyledText tag="p" content="Disclaimer" fontWeight={'600'} />
                <StyledSpace medium vertical />
                <StyledText tag="h2" content="This is a Portfolio Project" minWidth={'50vh'} />
                <StyledSpace small vertical />
                <StyledText 
                    tag="p" 
                    content="This portfolio project showcases my skills using various technologies, including TypeScript, JavaScript, Node.js, Express.js, React.js, and in particular, the MERN stack. Styled Components have also been used for styling." 
                />
                <StyledSpace medium vertical />
                <StyledText 
                    tag="p" 
                    content="Thank you for visiting the project!" 
                />
            </TextWrapper>

            {!isMobile && !isTablet && (
                <ImageWrapper>
                    <img src={Image} alt="Minimalist desk setup with monitor and coding posters." />
                </ImageWrapper>
            )}
        </StyledSection>
    );
};