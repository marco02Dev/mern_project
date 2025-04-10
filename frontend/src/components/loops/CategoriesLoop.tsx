import { ReactElement, FC, Fragment } from "react";
import { categories } from "../../config/categories.config";
import { CategoryBox } from "../boxes/CategoryBox";
import { StyledSpace } from "../themed/StyledSpace";
import styled from "styled-components";
import { sizes } from "../../config/sizes.config";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

export const CategoriesLoop: FC = (): ReactElement => {
    return <Wrapper>
        {categories.map((cat, index): ReactElement => {
            const isEven: boolean = (index + 1) % 2 === 0;
            const isOdd: boolean = (index + 1) % 2 !== 0;

            return <Fragment key={index} > 
                <CategoryBox 
                    title={cat}
                    description={`Master the basics of ${cat}`}
                    to={`/courses/${cat}`}
                />

                {isOdd && <StyledSpace vertical height={"20vh"} width={"3.4%"}/>}
                {isEven && <StyledSpace horizontal height={sizes.spaces.medium} width={"100%"}/>}
            </ Fragment>
        })}    
    </ Wrapper>
}