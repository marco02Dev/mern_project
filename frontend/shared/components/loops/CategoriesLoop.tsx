import { ReactElement, FC, Fragment } from "react";
import { categories } from "@shared/config/categories.config";
import { CategoryBox } from "../boxes/CategoryBox";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { sizes } from "@shared/config/sizes.config";
import { useMediaQuery, UseMediaQuery } from "../../hooks/ui/useMediaQuery";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";

const Wrapper = styled.div<{$isMobile: boolean}>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategoriesLoop: FC = (): ReactElement => {
    let delay: string;
    const { isMobile }: UseMediaQuery = useMediaQuery();

    return <Wrapper $isMobile={isMobile}>
        {categories.map((cat, index): ReactElement => {
            const isEven: boolean = (index + 1) % 2 === 0;
            const isOdd: boolean = (index + 1) % 2 !== 0;

            if(index >= 1) {
                delay = sumStringDelays(delay, "300ms");
            }

            return <Fragment key={index} > 
                <CategoryBox 
                    title={cat}
                    description={`Master the basics of ${cat}`}
                    to={`/courses/${cat}`}
                    delay={delay}
                />

                {isOdd && !isMobile && <StyledSpace vertical height={"20vh"} width={"3.4%"}/>}
                {isEven && !isMobile && <StyledSpace vertical height={sizes.spaces.medium} width={"100%"}/>}

                {isMobile && <StyledSpace vertical height={sizes.spaces.medium} width={"100%"}/>}
            </ Fragment>
        })}    
    </ Wrapper>
}