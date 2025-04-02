import { ReactElement } from "react";
import { StyledSection } from "../styled/styled-section";
import { StyledText } from "../styled/styled-text";

export const SeeAllCoursesSection = (): ReactElement => {
    return <StyledSection>
        <StyledText 
            tag={'h2'} 
            content={'Master Your Skills Today!'}
        />

        <StyledText 
            tag={'p'} 
            content={'Join our exclusive courses designed to elevate your expertise. Login or Sign Up to start your adventure in learning!'}
        />
        
    </StyledSection>
}