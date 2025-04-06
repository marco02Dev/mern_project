import { ReactElement } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { CoursesLoop } from "../loops/CoursesLoop";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export type TwoProductPreviewSectionProps = {
    title: string,
    all: boolean,
    latest?: boolean,
    category?: string,
    twoBoxes?: boolean,
    threeBoxes?: boolean
}

export const SmallProductsPreviewSection = ({title, latest, twoBoxes, threeBoxes}: TwoProductPreviewSectionProps): ReactElement => {

    const { isMobile, isTablet } = useMediaQuery()

    let limit: number;
    if(twoBoxes) {
        limit = 2
    } else if(threeBoxes) {
        limit = 3
    } else {
        limit = 2
    }

    return <StyledSection height={isMobile || isTablet ? "100vh" : "100vh"} paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TitleWrapper>
            <StyledText tag="h2" content={title} />
        </TitleWrapper>

        <StyledSpace small vertical />

        <CoursesLoop limit={limit} latest={latest} />

    </StyledSection>
}