import { ReactElement } from "react";
import { StyledSection } from "../components/themed/StyledSection";
import { StyledText } from "../components/themed/StyledText";

export const Admin = (): ReactElement => {
    return <StyledSection>
        <StyledText tag="h2" content="Log in" />
    </StyledSection>
}