import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledSpace } from "../../styles/styled-space";
import { StyledText } from "../../styles/styled-text";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const LatestCoursesSection = (): ReactElement => {
    return <StyledSection paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TitleWrapper>
            <StyledText tag="h2" content={'Latest courses'} />
        </TitleWrapper>

    </StyledSection>
}