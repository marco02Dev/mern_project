import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledText } from "../../styles/styled-text";
import { StyledSpace } from "../../styles/styled-space";
import { StyledButton } from "../../styles/styled-button";
import { sizes } from "../../config/sizes.config";

export const SeeAllCoursesSection = (): ReactElement => {
    return <StyledSection secondaryColor paddingLeft={sizes.spaces.medium} paddingRight={sizes.spaces.medium} justifyCenter>
        <StyledText 
            tag={'h2'} 
            content={'Master Your Skills Today!'}
        />

        <StyledSpace medium vertical />

        <StyledText 
            tag={'p'} 
            content={'Join our exclusive courses designed to elevate your expertise. Login or Sign Up to start your adventure in learning!'}
        />

        <StyledSpace medium vertical />

        <StyledButton content="See all coureses" to="/courses"  />
        
    </StyledSection>
}