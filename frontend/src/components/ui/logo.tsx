import { StyledLink } from "../../styles/styled-link";
import { ReactElement } from "react";
import { logoHover } from "../../animations/logo-hover";
import { FadeInWrapper } from "../animated/fade-in-wrapper";

export const Logo = (): ReactElement => {

  return (
    <FadeInWrapper additionalAnimation={logoHover}> 
      <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"} 
        size={'p'}
        fontWeight={'900'}
        logo
      />

      <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"} 
        size={'p'}
        fontWeight={'900'}
        logo
        absolute
      />
    </ FadeInWrapper>
  );
};
