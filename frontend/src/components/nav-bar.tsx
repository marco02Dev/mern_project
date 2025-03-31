import { Link } from "react-router-dom";
import { ReactElement } from "react";
import styled from "styled-components";

const Nav = styled.nav`
    background-color: black;
    color: white;
`;

export const NavBar = (): ReactElement => {
    return <Nav>
        <Link to={'/'}></Link>
    </Nav>
}