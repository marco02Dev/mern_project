import { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { revealHiddenElements } from "../../animations/page-transition-element.animation";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { useLocation, Location } from "react-router-dom";
import { StyledText } from "../themed/StyledText";
import { colors } from "../../config/colors.config";
import useLocationChange from "../../hooks/useLocationChange";
import { SlideUpDownPageTransitionTitleAnimation } from "../../animations/page-transition-title.animation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { FC } from "react";
import { LoginState } from "../../store/slices/login.slice";
import { capitalizeFirstLetter } from "../../utils/common/capitalize-first-letter.util";

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
    const is404 = useSelector((state: RootState) => state.routeStatus.is404);
    const { isMobile }: UseMediaQuery = useMediaQuery()
    const hasLocationChanged: boolean = useLocationChange();
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color = mode === 'dark' ? colors.dark.backgroundColor : colors.light.backgroundColor;

    const location: Location = useLocation(); 
    const pathName: string = location.pathname;
    let title: string = pathName.replace('/', "");
    const innerPathName: number = title.indexOf("/")

    if(innerPathName !== -1) {
        title = title.slice(0, innerPathName)
    }

    let titleCapitalized: string = title.charAt(0).toUpperCase() + title.slice(1);

    useEffect(() => {
        if (pathName === "/") {
            setTimeout(() => {
                setIsFirstRender(false);
            }, 1500)

        }
    }, [pathName]);

    if(!titleCapitalized) {
        if(isFirstRender) {
            titleCapitalized = "Welcome";
        } else if(!isFirstRender){
            titleCapitalized = "Welcome back";
        }
    }

    const { isLoggedIn, user }: LoginState = useSelector((state: RootState) => state.login);

    if(isLoggedIn && pathName === '/account' && user) {
        titleCapitalized = `Welcome back ${capitalizeFirstLetter(user?.name)}`
    }


    if(!hasLocationChanged || is404) {
        return null;
    } else {
        return (
            <TitleWrapper $hasLocationChanged={hasLocationChanged}>
                <RevealWrapper $hasLocationChanged={hasLocationChanged}>
                    {pathName === "/" ? !isMobile ?
                    <StyledText lineHeight="20vh" tag="h2" size="h2" content={titleCapitalized} color={color} />
                    : titleCapitalized === "Welcome" ? <StyledText tag="h2" size="h1" content={titleCapitalized} color={color} /> : <>
                        <StyledText tag="h2" size="h2" content={"Welcome"} color={color} />  
                        <br /> 
                        <StyledText tag="h2" size="h2" content={"back"} color={color} />   
                    </>
                    
                    : <StyledText tag="h2" size="h2" content={titleCapitalized} color={color} />}
                </RevealWrapper>
            </TitleWrapper>
        );
    }
};
