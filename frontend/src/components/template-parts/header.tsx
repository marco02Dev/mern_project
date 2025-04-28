import { FC, ReactElement} from "react";
import styled from "styled-components";
import { useHeaderVisibility } from "../../hooks/useHeaderVisibility";
import { NavLinks } from "../ui/NavLinks";
import { StyledSpace } from "../themed/StyledSpace";
import { StyledSection } from "../themed/StyledSection";
import {useMediaQuery, UseMediaQuery} from "../../hooks/useMediaQuery";
import { StyledMobileMenu } from "../themed/StyledMobileMenu";
import { LogoHomeButton } from "../buttons/LogoHomeButton";
import { sizes } from "../../config/sizes.config";
import { SwitchThemeModeButton } from "../buttons/SwitchThemeModeButton";
import { LoginAccountAdminButton } from "../buttons/LoginAccountAdminButton";

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
                        <SwitchThemeModeButton />
                        <StyledSpace horizontal small />
                        <StyledMobileMenu /> 
                    </MobileNavInnerWrapper>
                </Nav>
            ) : (
                <Nav>
                    <DesktopNavInnerWrapper $width="20%">
                        <LogoHomeButton />
                    </DesktopNavInnerWrapper>

                    <DesktopNavInnerWrapper $width="60%" $middleWrapper>
                        <NavLinks row />
                    </DesktopNavInnerWrapper>

                    <DesktopNavInnerWrapper $width="20%" $flexEnd>
                        <LoginAccountAdminButton />
                        <StyledSpace horizontal small />
                        <SwitchThemeModeButton />
                    </DesktopNavInnerWrapper>
                </Nav>
            )}

            <StyledSpace vertical verySmall/>
        </StyledSection>
    );
};