import { StyledLink } from "../themed/StyledLink";
import { ReactElement, FC } from "react";
import { logoHover } from "../../animations/logo.animation";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useLocation, Location } from "react-router-dom";
import { css } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LoginState } from "../../store/slices/login.slice";

export const LogoHomeButton: FC = (): ReactElement => {
  const location: Location = useLocation();
  const isInactive: boolean = location.pathname == "/";
  const { isLoggedIn, user }: LoginState = useSelector((state: RootState) => state.login);
  const role: string | undefined = isLoggedIn ? user?.role : "";
  const isAdmin: boolean = role === "admin";

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
        reloadDocument={isAdmin}
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
        reloadDocument={isAdmin}
      /> }
     
    </FadeInWrapper>
  );
};