import { ReactElement } from "react";
import { StyledSection } from "../../styles/styled-section";
import { StyledSpace } from "../../styles/styled-space";
import { StyledText } from "../../styles/styled-text";
import styled from "styled-components";
import { sizes } from "../../config/sizes.config";
import { CategoryBox } from "../boxes/category.box";

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    div {
        flex-basis: 48%;
    }
`;

export const BrowseCategoriesSection = (): ReactElement => {
    return <StyledSection paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>
            <StyledSpace medium vertical />
    
            <TitleWrapper>
                <StyledText tag="h2" content={'Browse all categories'} />
            </TitleWrapper>

            <StyledSpace medium vertical />

            <CategoriesWrapper>
                <CategoryBox title="Front End" description="Master the basics of front end" to='/courses/frontend'/>
                <CategoryBox marginLeft={"4%"} title="Back End" description="Master the basics of back end" to='/courses/backend'/>
            </CategoriesWrapper>
            
            <StyledSpace small vertical />

            <CategoriesWrapper>
                <CategoryBox title="SEO" description="Master the basics of back end" to='/courses/seo'/>
                <CategoryBox marginLeft={"4%"} title="Web Design" description="Master the basics of design" to='/courses/design'/>
            </CategoriesWrapper>
    </StyledSection>
}