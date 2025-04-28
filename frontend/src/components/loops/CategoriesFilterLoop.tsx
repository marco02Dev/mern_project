import { categories } from "../../config/categories.config";
import { StyledLink } from "../themed/StyledLink";
import { capitalizeFirstLetter } from "../../utils/common/capitalize-first-letter.util";
import { FC, ReactElement, SetStateAction, Dispatch } from "react";
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

type CategoriesFIlterProps = {
    setCategoryFilter: Dispatch<SetStateAction<string | undefined>>,
    categoryFilter: string | undefined
}

export const CategoriesFilterLoop: FC<CategoriesFIlterProps> = ({
    setCategoryFilter,
    categoryFilter
}: CategoriesFIlterProps): ReactElement => {

    return <Wrapper>
        <div>
            <StyledLink 
                content="All" 
                onClickFunction={(event) => {
                    event.preventDefault();
                    setCategoryFilter("");
                }}
            />
        </div>

        <div>
            {categories.map((category, index) => <>
                <StyledLink
                    key={index}
                    inactive={categoryFilter === category}
                    color={categoryFilter === category ? "blue" : ""}
                    content={capitalizeFirstLetter(category)}
                    onClickFunction={(event) => {
                        event.preventDefault();
                        setCategoryFilter(category);
                    }}
                />

                <StyledSpace small horizontal />
            </> )}
        </div>
    </ Wrapper>
}