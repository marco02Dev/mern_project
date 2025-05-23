import React, { SetStateAction, Dispatch, FC, useEffect } from 'react';
import { StyledLink } from '@shared/components/themed/StyledLink';
import { StyledSpace } from '@shared/components/themed/StyledSpace';
import { FadeInWrapper } from '@shared/components/animated/FadeInWrapper';
import { UseMediaQuery, useMediaQuery } from '@shared/hooks/ui/useMediaQuery';
import { useLocation, Location } from 'react-router-dom';
import { useUnsetActiveColor } from '@shared/hooks/ui/useUnsetActiveColor';
import { sumStringDelays } from '@shared/utils/components/sum-string-delays.util';
import { ThemeColors, useThemeColors } from '@shared/hooks/theme/useThemeColors';
import { UseAuth, useAuth } from '@shared/hooks/auth/useAuth';
import { useIsCurrentPath, UseIsCurrentPath } from '@shared/hooks/navigation/useIsCurrentPath';

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
  const { hoverColor }: ThemeColors = useThemeColors();
  const isLoginPage: UseIsCurrentPath = useIsCurrentPath('/login');
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
        const isActive: boolean = location.pathname === link.to;
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
            content={isLoggedIn ? 'Account' : isLoginPage ? "Signup" : "Login"}
            to={isLoggedIn ? '/account' : isLoginPage ? "/signup" : "/login"}
            fontWeight="700"
            size={row ? 'p' : 'h3'}
            reloadDocument={isLoggedIn}
          />
        </FadeInWrapper>
      )}
    </>
  );
};
