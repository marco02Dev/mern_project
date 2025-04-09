import { ReactElement, FC, Fragment } from "react";
import { categories } from "../../config/categories.config";
import { CategoryBox } from "../boxes/CategoryBox";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

export const CategoriesLoop: FC = (): ReactElement => {
    return <Wrapper>
        {categories.map((cat, index): ReactElement => {
            return <Fragment key={index} > 
                <CategoryBox 
                    title={cat}
                    description={`Master the basics of ${cat}`}
                    to={`/courses/${cat}`}
                />
            </ Fragment>
        })}    
    </ Wrapper>
}