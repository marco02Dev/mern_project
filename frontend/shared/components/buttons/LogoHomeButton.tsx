import { StyledLink } from "@shared/components/themed/StyledLink";
import { ReactElement, FC } from "react";
import { useAuth, UseAuth } from "@shared/hooks/auth/useAuth";
import { logoHover } from "@shared/animations/logo.animation";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { useLocation, Location } from "react-router-dom";
import { css } from "styled-components";

export const LogoHomeButton: FC = (): ReactElement => {
  const location: Location = useLocation();
  const isInactive: boolean = location.pathname == "/";
  const { isLoggedIn }: UseAuth = useAuth();

  return (
    <FadeInWrapper additionalAnimation={!isInactive ? logoHover : css``}> 
      <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"} 
        size={'p'}
        fontWeight={'900'}
        logo
        inactive={isInactive}
        reloadDocument={isLoggedIn}
      />

      {!isInactive && <StyledLink 
        content={'<WebCourses>'} 
        to="/" 
        tag={"h1"}  
        size={'p'}
        fontWeight={'900'}
        logo
        absolute
        inactive={isInactive}
        reloadDocument={isLoggedIn}
      /> }
     
    </FadeInWrapper>
  );
};