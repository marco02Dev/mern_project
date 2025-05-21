import { ReactNode } from "react";
import styled from "styled-components";
import { UseAuth, useAuth } from "@shared/hooks/auth/useAuth";
import { revealHiddenElements } from "@shared/animations/page-transition-element.animation";
import { useLocation, Location } from "react-router-dom";
import { StyledText } from "@shared/components/themed/StyledText";
import useLocationChange, { UseLocationChange } from "@shared/hooks/navigation/useLocationChange";
import { SlideUpDownPageTransitionTitleAnimation } from "@shared/animations/page-transition-title.animation";
import { useSelector } from "react-redux";
import { RootState } from "@shared/store";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { FC } from "react";
import { useFirstRender } from "@shared/hooks/ui/useIsFirstRender";
import { getPageTransitionFormattedTitle } from "@shared/utils/components/get-formatted-title";
import { useThemeColors, ThemeColors } from "@shared/hooks/theme/useThemeColors";

const TitleWrapper = styled.div<{$hasLocationChanged: boolean}>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    position: fixed;
    ${() => revealHiddenElements}
    z-index: 2000;
`;

const RevealWrapper = styled.div<{$hasLocationChanged: boolean}>`
    text-align: center;
    overflow: hidden;
    h2 {
        transform: translateY(100%);
        padding: 1vh;
        ${({$hasLocationChanged}) => $hasLocationChanged ?  SlideUpDownPageTransitionTitleAnimation : "translateY(0%)"};
    }
`;

export const PageTransitionTitle: FC = (): ReactNode => {
    const is404: boolean = useSelector((state: RootState) => state.routeStatus.is404);
    const { isMobile }: UseMediaQuery = useMediaQuery();
    const hasLocationChanged: UseLocationChange = useLocationChange();
    const { isLoggedIn, userData }: UseAuth = useAuth();
    const { backgroundColor }: ThemeColors = useThemeColors();
    const location: Location = useLocation();
    const pathName: string = location.pathname;
    const isFirstRender: boolean = useFirstRender(pathName);
    const titleCapitalized: string = getPageTransitionFormattedTitle({
        pathName: pathName, 
        isFirstRender: isFirstRender, 
        isLoggedIn: isLoggedIn, 
        userName: userData?.name as string,
        isMobile: isMobile
    });

    if (!hasLocationChanged || is404) {
        return null;
    } else {
        return (
            <TitleWrapper $hasLocationChanged={hasLocationChanged}>
                <RevealWrapper $hasLocationChanged={hasLocationChanged}>
                        <StyledText 
                            lineHeight="20vh" 
                            tag="h2" 
                            size={isMobile ? "h2" : "h1"} 
                            content={titleCapitalized} 
                            color={backgroundColor} 
                        />
                </RevealWrapper>
            </TitleWrapper>
        );
    }
};
