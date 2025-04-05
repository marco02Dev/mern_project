import { ReactElement, useEffect, useState } from "react";
import styled, { css, RuleSet } from "styled-components";
import { NavLinks } from "../ui/NavLinks";
import { StyledButton } from "../themed/StyledButton";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledSection } from "../themed/StyledSection";
import { UseScrollY, useScrollY } from "../../hooks/useScrollY";
import {useMediaQuery, UseMediaQuery} from "../../hooks/useMediaQuery";
import { StyledMobileMenu } from "../themed/StyledMobileMenu";
import { Logo } from "../ui/Logo";
import { sizes } from "../../config/sizes.config";
import { SwitchThemeModeButton } from "../ui/SwitchThemeModeButton";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { useLocation } from 'react-router-dom';
import { HideHeaderAnimation, RevealHeaderAnimation } from "../../animations/reveal-hide-header.animation";

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

export const Header = (): ReactElement => {

    const [headerHidden, setHeaderHidden] = useState<boolean>(true);
    const {scrollY, latestScrollY}: UseScrollY = useScrollY();
    const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();
    const {pathname} = useLocation();
    const isCourses: boolean = pathname === "/courses";

    let animation: RuleSet = css`
        animation: unset;
    `;

    if(headerHidden) {
        animation = css`
            animation: unset;
        `;
    } else {
        if (scrollY > latestScrollY) {
            animation = HideHeaderAnimation;
        } else {
            animation = RevealHeaderAnimation;
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setHeaderHidden(false)
        }, 500)

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
        secondaryColor={isCourses}
        >

        <StyledSpace vertical verySmall />

        { isMobile || isTablet ? 
            <Nav>
                <MobileNavInnerWrapper>
                    <Logo />
                </MobileNavInnerWrapper>

                <MobileNavInnerWrapper $justifyEnd> 
                    <SwitchThemeModeButton />
                    <StyledSpace horizontal small />
                    <StyledMobileMenu /> 
                </MobileNavInnerWrapper>
            </ Nav> : <Nav>

                <DesktopNavInnerWrapper $width={'20%'}>
                    <Logo />
                </DesktopNavInnerWrapper>

                <DesktopNavInnerWrapper $width={'60%'} $middleWrapper>
                    <NavLinks row />
                </DesktopNavInnerWrapper>

                <DesktopNavInnerWrapper $width={'20%'} $flexEnd>
                    <FadeInWrapper>
                        <StyledButton content={'Login'} to={'/login'} headerElement />
                    </FadeInWrapper>
                    <StyledSpace horizontal small />
                    <SwitchThemeModeButton />
                </DesktopNavInnerWrapper>
            </ Nav>

        }

        <StyledSpace vertical verySmall/>

    </StyledSection>
}