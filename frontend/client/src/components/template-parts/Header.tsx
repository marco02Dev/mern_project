import { FC, ReactElement, useState} from "react";
import styled from "styled-components";
import { useHeaderVisibility } from "../../hooks/ui/useHeaderVisibility";
import { NavLinks } from "../ui/NavLinks";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledSection } from "../themed/StyledSection";
import {useMediaQuery, UseMediaQuery} from "../../hooks/ui/useMediaQuery";
import { StyledMobileMenu } from "../themed/StyledMobileMenu";
import { LogoHomeButton } from "../buttons/LogoHomeButton";
import { sizes } from "../../config/sizes.config";
import { SwitchThemeModeButton } from "../buttons/SwitchThemeModeButton";
import { LoginAccountAdminButton } from "../buttons/LoginAccountAdminButton";
import { sumStringDelays } from "../../utils/components/sum-string-delays.util";
import { useLocation, Location } from "react-router-dom";

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
    const { headerHidden, animation } = useHeaderVisibility();
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const [desktopButtonsStartDelay, setDesktopButtonStartDelay] = useState<string | undefined>("");
    const location: Location = useLocation();
    const path: string = location.pathname;
    const isAccount: boolean = path === "/admin/" || path === "/account/";

    return (
        <StyledSection 
            semanticTag="header" 
            fixed 
            height="auto" 
            paddingLeft={sizes.spaces.medium}
            paddingRight={sizes.spaces.medium}
            animation={animation} 
            block
            row
            hiddenFirstRender={headerHidden}
        >
            <StyledSpace vertical verySmall />

            { (isMobile || isTablet) ? (
                <Nav>
                    <MobileNavInnerWrapper>
                        <LogoHomeButton />
                    </MobileNavInnerWrapper>

                    <MobileNavInnerWrapper $justifyEnd> 
                        <SwitchThemeModeButton delay={"200ms"}/>

                        {!isAccount && <>
                            <StyledSpace horizontal small />
                            <StyledMobileMenu delay={"400ms"} />
                        </>}

                    </MobileNavInnerWrapper>
                </Nav>
            ) : (
                <Nav>
                    <DesktopNavInnerWrapper $width="20%">
                        <LogoHomeButton />
                    </DesktopNavInnerWrapper>

                    <DesktopNavInnerWrapper $width="60%" $middleWrapper>
                        {!isAccount && <NavLinks row setDesktopButtonStartDelay={setDesktopButtonStartDelay} />}
                    </DesktopNavInnerWrapper>

                    <DesktopNavInnerWrapper $width="20%" $flexEnd>
                        <LoginAccountAdminButton delay={sumStringDelays(desktopButtonsStartDelay, "200ms")} />
                        <StyledSpace horizontal small />
                        <SwitchThemeModeButton delay={sumStringDelays(desktopButtonsStartDelay, "400ms")} />
                    </DesktopNavInnerWrapper>
                </Nav>
            )}

            <StyledSpace vertical verySmall/>
        </StyledSection>
    );
};