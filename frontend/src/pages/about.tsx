import { ReactElement } from "react"
import { WhyChooseUsSection } from "../components/sections/why-choose-us";
import { StyledSection } from "../styles/styled-section";

export const About = (): ReactElement => {
    return <StyledSection>
        <WhyChooseUsSection />
    </StyledSection>
}