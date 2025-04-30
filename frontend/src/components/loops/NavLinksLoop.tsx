import React, { SetStateAction, useContext, Dispatch, FC, useEffect } from 'react';
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
import { sumStringDelays } from '../../utils/components/sum-string-delays.util';
import { multiPageAppMode } from '../../config/app.config';

type NavLinksLoopProps = {
  links: { name: string; to: string }[];
  row?: boolean;
  setDesktopButtonStartDelay?: Dispatch<SetStateAction<string | undefined>>;
}

export const NavLinksLoop: FC<NavLinksLoopProps> = ({
  links,
  row,
  setDesktopButtonStartDelay
}: NavLinksLoopProps) => {
  const { isMobile, isTablet } = useMediaQuery();
  const login = useSelector((state: RootState) => state.login);
  const { isLoggedIn } = login;
  const location = useLocation();
  const { mode } = useContext(ThemeModeContext);
  const isActiveColor = mode === "dark" ? colors.dark.hoverColor : colors.light.hoverColor;
  const { unsetActiveColor, handleMouseHover, handleMouseLeave } = useUnsetActiveColor();
  let delay: string = "0ms";
  let lastDelay: string = "0ms";

  useEffect(() => {
    setDesktopButtonStartDelay && setDesktopButtonStartDelay(lastDelay)
  }, [delay, lastDelay]);

  return (
    <>
      {links.map((link, index) => {
        const isActive = location.pathname === link.to;
        delay = sumStringDelays(delay, "200ms");
        lastDelay = delay

        return (
          <React.Fragment key={index}>
            <FadeInWrapper delay={delay}>
                <div onMouseOver={handleMouseHover} onMouseLeave={handleMouseLeave} className={isActive ? "is-active" : "is-not-active"}>
                    <StyledLink
                        content={link.name}
                        to={link.to}
                        fontWeight="700"
                        size={row ? 'p' : 'h3'}
                        color={isActive && !unsetActiveColor ? isActiveColor : undefined}
                        inactive={isActive}
                        reloadDocument={multiPageAppMode}
                    />
                </div>
            </FadeInWrapper>

            <StyledSpace horizontal={row} vertical={!row} small={row} medium={!row} />
          </React.Fragment>
        );
      })}

      {(isMobile || isTablet) && (
        <FadeInWrapper delay={sumStringDelays(lastDelay, "200ms")}>
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
