import { StyledLink } from "../themed/StyledLink";
import { ReactElement } from "react";
import { logoHover } from "../../animations/logo.animation";
import { FadeInWrapper } from "../animated/FadeInWrapper";

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
