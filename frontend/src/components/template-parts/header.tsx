import { ReactElement, useEffect, useState } from "react";
import styled, { keyframes, css, RuleSet } from "styled-components";
import { NavLinks } from "../ui/nav-links";
import { StyledButton } from "../../styles/styled-button";
import { StyledSpace } from "../../styles/styled-space";
import { StyledSection } from "../../styles/styled-section";
import { UseScrollY, useScrollY } from "../../hooks/useScrollY";
import {useMediaQuery, UseMediaQuery} from "../../hooks/useMediaQuery";
import { StyledMobileMenu } from "../../styles/styled-mobile-munu";
import { Logo } from "../ui/logo";
import { sizes } from "../../config/sizes.config";
import { SwitchThemeMode } from "../ui/switch-theme-mode";
import { FadeInWrapper } from "../animated/fade-in-wrapper";
import { useLocation } from 'react-router-dom';

const translateUp = keyframes`
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100%);
    }
`;

const translateDown = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

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
            animation = css`
                animation: ${translateUp} 0.5s ease-in-out forwards;
            `;
        } else {
            animation = css`
                animation: ${translateDown} 0.5s ease-in-out forwards;
            `;
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
                    <SwitchThemeMode />
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
                    <SwitchThemeMode />
                </DesktopNavInnerWrapper>
            </ Nav>

        }

        <StyledSpace vertical verySmall/>

    </StyledSection>
}