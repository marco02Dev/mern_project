import { ReactElement } from "react";
import { StyledSection } from "../styles/styled-section";
import { StyledText } from "../styles/styled-text";

export const Admin = (): ReactElement => {
    return <StyledSection>
        <StyledText tag="h2" content="Log in" />
    </StyledSection>
}