import { ReactElement } from "react";
import styled from "styled-components";
import { StyledLink } from "../styled/styled-link";
import { StyledButton } from "../styled/styled-button";
import { StyledSpace } from "../styled/styled-space";

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    div:first-child {
        width: 20%;
    },
    div:last-child {
        width: 20%;
    },
    div {
        width: 60%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
`;

export const NavBar = (): ReactElement => {
    return <Nav>
        <div>
            <StyledLink 
                content={'<WebCourses>'} 
                to="/" 
                tag={"h1"} 
                size={'h5'}
                fontWeight={'900'}
            />
        </div>

        <div>
            <StyledSpace horizontal small />

            <StyledLink 
                content={'Home'} 
                to="/"
                fontWeight={'700'}
            />

            <StyledSpace horizontal small />

            <StyledLink 
                content={'Couorses'} 
                to="/courses"
                fontWeight={'700'}
            />

            <StyledSpace horizontal small />\

            <StyledLink 
                content={'About'} 
                to="/about"
                fontWeight={'700'}
            />
        </div>

        <div>
            <StyledButton
                content={'Login'}
                to={'/login'}
            />
        </div>
    </Nav>
}