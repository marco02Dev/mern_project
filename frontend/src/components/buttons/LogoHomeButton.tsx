import { StyledLink } from "../themed/StyledLink";
import { ReactElement, FC } from "react";
import { logoHover } from "../../animations/logo.animation";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useLocation, Location } from "react-router-dom";

export const LogoHomeButton: FC = (): ReactElement => {
  const location: Location = useLocation();
  const isInactive: boolean = location.pathname == "/";

  return (
    <FadeInWrapper additionalAnimation={logoHover}> 
      <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"} 
        size={'p'}
        fontWeight={'900'}
        logo
        inactive={isInactive}
      />

      <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"} 
        size={'p'}
        fontWeight={'900'}
        logo
        absolute
        inactive={isInactive}
      />
    </FadeInWrapper>
  );
};