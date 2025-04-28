import { categories } from "../../config/categories.config";
import { StyledLink } from "../themed/StyledLink";
import { capitalizeFirstLetter } from "../../utils/common/capitalize-first-letter.util";
import { FC, ReactElement } from "react";
import styled from "styled-components";
import { StyledSpace } from "../themed/StyledSpace";

const Wrapper = styled.nav`
    display: flex;
    flex-direction: row;
    width: 100%;

    div {
        display: flex;
        width: 80%;
    }
    
    div:first-child {
        width: 20%;
    }

    div:last-child {
        justify-content: end;
    }
`;

export const CategoriesFilterLoop: FC = (): ReactElement => {
    return <Wrapper>
        <div>
            <StyledLink content="All" />
        </div>

        <div>
            {categories.map((category, index) => <>
                <StyledLink
                    key={index}
                    content={capitalizeFirstLetter(category)}
                    to={`courses/${category}`}
                />

                <StyledSpace small horizontal />
            </> )}
        </div>
    </ Wrapper>
}