import { ReactNode, useContext, useEffect } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { moveWholeContainerOutAnimation } from "../../animations/page-transition-element.animation";
import { revealLinesAnimation, revealLinesAnimationDelayedFirst, revealLinesAnimationDelayedSecond } from "../../animations/page-transition-element.animation";
import { revealHiddenElements } from "../../animations/page-transition-element.animation";
import useLocationChange from "../../hooks/useLocationChange";

type WrapperProps = {
    $hasLocationChanged: boolean,
    $color: string
}

const Wrapper = styled.div<WrapperProps>`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;

    ${() => revealHiddenElements};
    ${({$hasLocationChanged}) => $hasLocationChanged && moveWholeContainerOutAnimation};
    div {
        width: 16.6667%;
        height: 100%;
        background-color: ${({$color}) => $color && $color};
        transform: translateY(100%);
    };
    div:nth-child(3), div:nth-child(4)  {
        ${({$hasLocationChanged}) => $hasLocationChanged && revealLinesAnimation};
    };
    div:nth-child(2), div:nth-child(5)  {
        ${({$hasLocationChanged}) => $hasLocationChanged && revealLinesAnimationDelayedFirst};
    };
    div:nth-child(1), div:nth-child(6)  {
       ${({$hasLocationChanged}) => $hasLocationChanged && revealLinesAnimationDelayedSecond};
    };
`;

export const PageTransitionElement = (): ReactNode => {
    const hasLocationChanged: boolean = useLocationChange();
    
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const wrapperColor = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    useEffect(() => {
        if (hasLocationChanged) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [hasLocationChanged]);

    if(!hasLocationChanged) {
        return null;
    } else {
        return <Wrapper $color={wrapperColor} $hasLocationChanged={hasLocationChanged}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Wrapper>
    }


}