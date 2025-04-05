import { ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { CoursesLoop } from "../loops/CoursesLoop";

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export type TwoProductPreviewSectionProps = {
    title: string,
    latest?: boolean
}

export const TwoProductPreviewSection = ({title, latest}: TwoProductPreviewSectionProps): ReactElement => {
    return <StyledSection paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TitleWrapper>
            <StyledText tag="h2" content={title} />
        </TitleWrapper>

        <CoursesLoop limit={2} latest={latest} />

    </StyledSection>
}