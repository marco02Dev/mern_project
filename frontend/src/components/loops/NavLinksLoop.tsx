import React, { SetStateAction, Dispatch, FC, useEffect } from 'react';
import { StyledLink } from '../themed/StyledLink';
import { StyledSpace } from '../themed/StyledSpace';
import { FadeInWrapper } from '../animated/FadeInWrapper';
import { UseMediaQuery, useMediaQuery } from '../../hooks/ui/useMediaQuery';
import { useLocation, Location } from 'react-router-dom';
import { useUnsetActiveColor } from '../../hooks/ui/useUnsetActiveColor';
import { sumStringDelays } from '../../utils/components/sum-string-delays.util';
import { ThemeColors, useThemeColors } from '../../hooks/theme/useThemeColors';
import { UseAuth, useAuth } from '../../hooks/auth/useAuth';

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
  const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
  const { isLoggedIn }: UseAuth = useAuth();
  const { hoverColor }: ThemeColors = useThemeColors()
  const location: Location = useLocation();
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
                        color={isActive && !unsetActiveColor ? hoverColor : undefined}
                        inactive={isActive}
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
            color={location.pathname === (isLoggedIn ? '/account' : '/login') ? hoverColor : undefined}
          />
        </FadeInWrapper>
      )}
    </>
  );
};
