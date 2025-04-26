import { FC, ReactElement, useEffect, useState } from "react";
import styled, { css, RuleSet } from "styled-components";
import { NavLinks } from "../ui/NavLinks";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledSection } from "../themed/StyledSection";
import { UseScrollY, useScrollY } from "../../hooks/useScrollY";
import {useMediaQuery, UseMediaQuery} from "../../hooks/useMediaQuery";
import { StyledMobileMenu } from "../themed/StyledMobileMenu";
import { LogoHomeButton } from "../buttons/LogoHomeButton";
import { sizes } from "../../config/sizes.config";
import { SwitchThemeModeButton } from "../buttons/SwitchThemeModeButton";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { HideHeaderAnimation, RevealHeaderAnimation } from "../../animations/header.animation";
import useLocationChange from "../../hooks/useLocationChange";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../types/user.types";

const Nav = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const MobileNavInnerWrapper  = styled.div<{$justifyEnd?: boolean}>`
    width: 50%;
    display: flex;
    justify-content: ${({$justifyEnd}) => $justifyEnd ? "flex-end" : 'flex-start'};
    align-items: center; 
`;

const DesktopNavInnerWrapper = styled.div<{$width: string, $middleWrapper?: boolean, $flexEnd?: boolean}>`
    width: ${({$width}) => $width};
    display: flex;
    flex-direction: row;
    justify-content: ${({$middleWrapper, $flexEnd}) => {
        if ($middleWrapper) {
            return 'center';
        } else if ($flexEnd) {
            return 'flex-end';
        } else {
            return 'flex-start';
        }
    }};
`;

export const Header: FC = (): ReactElement => {
    const isLocationChanged: boolean = useLocationChange();
    const [headerHidden, setHeaderHidden] = useState<boolean>(true);
    const {scrollY, latestScrollY}: UseScrollY = useScrollY();
    const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();

    const { isLoggedIn }: { isLoggedIn: boolean } = useSelector((state: RootState) => state.login);
    const user: User | undefined = useSelector((state: RootState) => state.login.user);
    const role: string | undefined = user?.role;

    let animation: RuleSet = css`
        animation: unset;
    `;

    if(headerHidden) {
        animation = css`
            animation: unset;
        `;
    } else {
        if (scrollY > latestScrollY || isLocationChanged) {
            animation = HideHeaderAnimation;
        } else {
            animation = RevealHeaderAnimation;
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setHeaderHidden(false)
        }, 2000)

    }, []);

    return <StyledSection 
        semanticTag={'header'} 
        fixed 
        height={"auto"} 
        paddingLeft={sizes.spaces.medium}
        paddingRight={sizes.spaces.medium}
        animation={animation} 
        block
        row
        hiddenFirstRender={headerHidden}
        >

        <StyledSpace vertical verySmall />

        { isMobile || isTablet ? 
            <Nav>
                <MobileNavInnerWrapper>
                    <LogoHomeButton />
                </MobileNavInnerWrapper>

                <MobileNavInnerWrapper $justifyEnd> 
                    <SwitchThemeModeButton />
                    <StyledSpace horizontal small />
                    <StyledMobileMenu /> 
                </MobileNavInnerWrapper>
            </ Nav> : <Nav>

                <DesktopNavInnerWrapper $width={'20%'}>
                    <LogoHomeButton />
                </DesktopNavInnerWrapper>

                <DesktopNavInnerWrapper $width={'60%'} $middleWrapper>
                    <NavLinks row />
                </DesktopNavInnerWrapper>

                <DesktopNavInnerWrapper $width={'20%'} $flexEnd>
                    <FadeInWrapper>
                        <StyledButton 
                            content={isLoggedIn ? role === "customer" ? "Account" : "Admin" : "Login"} 
                            to={isLoggedIn ? role === "customer" ? "/account" : "/admin" : "/login"} 
                            unsetShadow
                        />
                    </FadeInWrapper>
                    <StyledSpace horizontal small />
                    <SwitchThemeModeButton />
                </DesktopNavInnerWrapper>
            </ Nav>

        }

        <StyledSpace vertical verySmall/>

    </StyledSection>
}