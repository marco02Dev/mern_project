import { FC, ReactElement, useState} from "react";
import styled from "styled-components";
import { useHeaderVisibility } from "@shared/hooks/ui/useHeaderVisibility";
import { NavLinksLayout } from "@shared/components/layouts/NavLinksLayout";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledSection } from "@shared/components/themed/StyledSection";
import {useMediaQuery, UseMediaQuery} from "@shared/hooks/ui/useMediaQuery";
import { StyledMobileMenu } from "@shared/components/themed/StyledMobileMenu";
import { LogoHomeButton } from "@shared/components/buttons/LogoHomeButton";
import { sizes } from "@shared/config/sizes.config";
import { SwitchThemeModeButton } from "@shared/components/buttons/SwitchThemeModeButton";
import { LoginAccountAdminButton } from "@shared/components/buttons/LoginAccountAdminButton";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";
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
                        {!isAccount && < NavLinksLayout row setDesktopButtonStartDelay={setDesktopButtonStartDelay} />}
                    </DesktopNavInnerWrapper>

                    <DesktopNavInnerWrapper $width="20%" $flexEnd>
                        {!isAccount && <LoginAccountAdminButton delay={sumStringDelays(desktopButtonsStartDelay, "200ms")} />}
                        <StyledSpace horizontal small />
                        <SwitchThemeModeButton delay={sumStringDelays(desktopButtonsStartDelay, "400ms")} />
                    </DesktopNavInnerWrapper>
                </Nav>
            )}

            <StyledSpace vertical verySmall/>
        </StyledSection>
    );
};