import { StyledLink } from "../../styles/styled-link";
import { StyledSpace } from "../../styles/styled-space";
import { ReactElement } from "react";

export const NavLinks = (): ReactElement => {
    return <>
        <StyledLink content={'Home'} to="/" fontWeight={'700'} size="p" />
        <StyledSpace horizontal small />
        <StyledLink content={'Courses'} to="/courses" fontWeight={'700'} size="p" />
        <StyledSpace horizontal small />
        <StyledLink content={'Categories'} to="/categories"fontWeight={'700'} size="p" />
        <StyledSpace horizontal small />
        <StyledLink content={'About'} to="/about"fontWeight={'700'} size="p" />
        <StyledSpace horizontal small />
        <StyledLink content={'Contact'} to="/contact"fontWeight={'700'} size="p" />
    </>
}