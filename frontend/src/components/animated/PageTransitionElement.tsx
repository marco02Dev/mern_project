import { ReactNode } from "react";
import { useBodyOverflow } from "../../hooks/useBodyOverflow";
import { useColorToggle } from "../../hooks/useColorToggle";
import styled from "styled-components";
import { moveWholeContainerOutAnimation } from "../../animations/page-transition-element.animation";
import { revealLinesAnimation, revealLinesAnimationDelayedFirst, revealLinesAnimationDelayedSecond } from "../../animations/page-transition-element.animation";
import { revealHiddenElements } from "../../animations/page-transition-element.animation";
import useLocationChange from "../../hooks/useLocationChange";
import { FC } from "react";
import { ThemeColors, useThemeColors } from "../../hooks/useThemeColors";

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

export const PageTransitionElement: FC = (): ReactNode => {
    const hasLocationChanged: boolean = useLocationChange();
    useBodyOverflow(hasLocationChanged);
    const { backgroundColor, backgroundColorSecondary }: ThemeColors = useThemeColors({ invertColors: true });
    const currentColor: string = useColorToggle(hasLocationChanged, backgroundColor, backgroundColorSecondary);

    if (!hasLocationChanged) {
        return null;
    } else {
        return (
            <Wrapper $color={currentColor} $hasLocationChanged={hasLocationChanged}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </Wrapper>
        );
    }
};