import { ReactNode } from "react";
import { FC } from "react";
import { StyledSection } from "@shared/components/themed/StyledSection";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledText } from "@shared/components/themed/StyledText";
import styled from "styled-components";
import { sizes } from "@shared/config/sizes.config";
import { CategoriesLoop } from "@shared/components/loops/CategoriesLoop";
import { TextRevealWrapper } from "@shared/components/animated/TextRevealWrapper";

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
        return <StyledSection justifyCenter secondaryColor={secondaryColor} paddingLeft={sizes.spaces.medium}  paddingRight={sizes.spaces.medium}>

            <TitleWrapper>
                <TextRevealWrapper>
                    <StyledText tag="h2" content={title} />
                </TextRevealWrapper>
            </TitleWrapper>

            <StyledSpace medium vertical />

            {categories && 
                <CategoriesLoop />
            } 

        </StyledSection>
    }

}