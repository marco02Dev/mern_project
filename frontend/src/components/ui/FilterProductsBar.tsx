import { FC, ReactElement } from "react";
import { StyledLink } from "../themed/StyledLink";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const FilterProductsBar: FC = (): ReactElement => {
    return <Wrapper>
        <div>
            <StyledLink content="All" to="/"/>
        </div>

        <div>
            <StyledLink content="Front end" to="/"/>
            <StyledLink content="Back end" to="/"/>
            <StyledLink content="Seo" to="/"/>
            <StyledLink content="Design" to="/"/>
        </div>

    </Wrapper>
}