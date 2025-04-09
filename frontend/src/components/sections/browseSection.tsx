import { ReactNode } from "react";
import { FC } from "react";
import { StyledSection } from "../themed/StyledSection";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledText } from "../themed/StyledText";
import styled from "styled-components";
import { sizes } from "../../config/sizes.config";
import { CategoriesLoop } from "../loops/CategoriesLoop";

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

type BrowseSectionProps = {
    title: string,
    categories: boolean,
    secondaryColor?: boolean
}

export const BrowseSection: FC<BrowseSectionProps> = ({categories, title, secondaryColor}: BrowseSectionProps): ReactNode => {

    if(categories) {
        return <StyledSection secondaryColor={secondaryColor} paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>
        <StyledSpace medium vertical />

        <TitleWrapper>
            <StyledText tag="h2" content={title} />
        </TitleWrapper>

        <StyledSpace medium vertical />

        {categories && 
            <CategoriesLoop />
        } 

        {/* //to handle future sections with similar layout */}

        </StyledSection>
    }

}