import React, { ReactElement } from 'react';
import { StyledLink } from '../themed/StyledLink';
import { StyledSpace } from '../themed/StyledSpace';
import { FadeInWrapper } from '../animated/FadeInWrapper';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLocation } from 'react-router-dom';

export const NavLinksLoop: React.FC<{ links: { name: string; to: string }[]; row?: boolean }> = ({
  links,
  row,
}: {
  links: { name: string; to: string }[];
  row?: boolean;
}): ReactElement => {
  const { isMobile, isTablet } = useMediaQuery();
  const login = useSelector((state: RootState) => state.login);
  const { isLoggedIn }: { isLoggedIn: boolean } = login;
  const location = useLocation();

  return (
    <>
      {links.map((link, index) => {
        const isActive = location.pathname === link.to;

        return (
          <React.Fragment key={index}>
            <FadeInWrapper>
              <StyledLink
                content={link.name}
                to={link.to}
                fontWeight="700"
                size={row ? 'p' : 'h3'}
                color={isActive ? 'blue' : undefined}
              />
            </FadeInWrapper>

            <StyledSpace horizontal={row} vertical={!row} small={row} medium={!row} />
          </React.Fragment>
        );
      })}

      {isMobile || isTablet ? (
        <>
          <FadeInWrapper>
            <StyledLink
              content={isLoggedIn ? 'Account' : 'login'}
              to={isLoggedIn ? '/account' : '/login'}
              fontWeight="700"
              size={row ? 'p' : 'h3'}
              color={location.pathname === (isLoggedIn ? '/account' : '/login') ? 'blue' : undefined}
            />
          </FadeInWrapper>
        </>
      ) : null}
    </>
  );
};
