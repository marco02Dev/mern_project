import React, { useContext } from 'react';
import { StyledLink } from '../themed/StyledLink';
import { StyledSpace } from '../themed/StyledSpace';
import { FadeInWrapper } from '../animated/FadeInWrapper';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLocation } from 'react-router-dom';
import { ThemeModeContext } from '../../contexts/ThemeModeProvider';
import { colors } from '../../config/colors.config';
import { useUnsetActiveColor } from '../../hooks/useUnsetActiveColor';

export const NavLinksLoop: React.FC<{ links: { name: string; to: string }[]; row?: boolean }> = ({
  links,
  row,
}) => {
  const { isMobile, isTablet } = useMediaQuery();
  const login = useSelector((state: RootState) => state.login);
  const { isLoggedIn } = login;
  const location = useLocation();
  const { mode } = useContext(ThemeModeContext);
  const isActiveColor = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
  
  const { unsetActiveColor, handleMouseHover, handleMouseLeave } = useUnsetActiveColor();

  return (
    <>
      {links.map((link, index) => {
        const isActive = location.pathname === link.to;

        return (
          <React.Fragment key={index}>
            <FadeInWrapper>
                <div onMouseOver={handleMouseHover} onMouseLeave={handleMouseLeave} className={isActive ? "is-active" : "is-not-active"}>
                    <StyledLink
                        content={link.name}
                        to={link.to}
                        fontWeight="700"
                        size={row ? 'p' : 'h3'}
                        color={isActive && !unsetActiveColor ? isActiveColor : undefined}
                        inactive={isActive}
                    />
                </div>
            </FadeInWrapper>

            <StyledSpace horizontal={row} vertical={!row} small={row} medium={!row} />
          </React.Fragment>
        );
      })}

      {(isMobile || isTablet) && (
        <FadeInWrapper>
          <StyledLink
            content={isLoggedIn ? 'Account' : 'login'}
            to={isLoggedIn ? '/account' : '/login'}
            fontWeight="700"
            size={row ? 'p' : 'h3'}
            color={location.pathname === (isLoggedIn ? '/account' : '/login') ? 'blue' : undefined}
          />
        </FadeInWrapper>
      )}
    </>
  );
};
