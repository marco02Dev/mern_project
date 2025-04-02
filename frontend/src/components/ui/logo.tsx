import { StyledLink } from "../../styles/styled-link";
import { ReactElement } from "react";

export const Logo = (): ReactElement => {
    return <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"} 
        size={'p'}
        fontWeight={'900'}
    />
}