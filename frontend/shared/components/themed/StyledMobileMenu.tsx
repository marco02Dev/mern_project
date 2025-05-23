import { ReactElement, useCallback, useEffect, FC, MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux"; 
import { toggleMenu, closeMenu } from "@shared/store/slices/menu.slice";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { RootState } from "@shared/store";
import { removeMiddleLines, rotateLineDown, rotateLineUp, restoreRotatedLine } from "@shared/animations/styled-mobile-menu.animation";
import { restoreMiddleLines } from "@shared/animations/styled-mobile-menu.animation";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { Dispatch } from "@reduxjs/toolkit";
import { ThemeColors, useThemeColors } from "@shared/hooks/theme/useThemeColors";

const Wrapper = styled.div<{$isOpened: boolean}>`
    display: flex;
    flex-direction: column;
    z-index: 1000;
    position: relative;
    width: 3.5vh;
    height: 3.5vh;
    ${({$isOpened}) => !$isOpened && css`
        transform: translate(0%, 14%);
    `};
    ${({$isOpened}) => $isOpened && css`
        justify-content: center;
        align-items: center;
    `};
`;

const MiddleWrapper = styled.div<{$removeLines?: boolean, $lineHeight: string}>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${({$removeLines}) => $removeLines ? removeMiddleLines : restoreMiddleLines};
    height: ${({$lineHeight}) => $lineHeight};
`;

const Line = styled.div<{$smallSize: string, $mediumSize: string, $color: string, $lastLine?: boolean, $rotateLineUp?: boolean, $rotateLineDown?: boolean}>`
    width: ${({ $mediumSize }) => $mediumSize};
    height: ${({ $smallSize }) => $smallSize};
    background-color: ${({ $color }) => $color};
    margin-bottom: ${({ $lastLine, $rotateLineUp, $rotateLineDown }) => !$lastLine && !$rotateLineUp && !$rotateLineDown && '29%'};
    ${({$rotateLineDown}) => $rotateLineDown && rotateLineDown }
    ${({$rotateLineUp}) => $rotateLineUp && rotateLineUp}

    ${({$rotateLineUp, $rotateLineDown}) => !$rotateLineUp && !$rotateLineDown && restoreRotatedLine}
`;

type StyledMobileMenuProps = {
    delay?: string
}

export const StyledMobileMenu: FC<StyledMobileMenuProps> = ({delay}: StyledMobileMenuProps): ReactElement => {
    const isOpened: boolean = useSelector(({menu}: RootState) => menu.isOpened);
    const dispatch: Dispatch = useDispatch();
    const { textColor }: ThemeColors = useThemeColors();
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const lineHeight: string = '14%';

    const toggleMenuHandler: MouseEventHandler = useCallback((): void => {
        dispatch(toggleMenu()); 
    }, [dispatch]);

    useEffect(() => {
        if (!isMobile || !isTablet) {
            dispatch(closeMenu()); 
        }
    }, [isMobile, isTablet, dispatch]);

    return (
        <FadeInWrapper delay={delay}>
            <Wrapper $isOpened={isOpened} onClick={toggleMenuHandler}>
                <Line $smallSize={lineHeight} $mediumSize={"100%"} $color={textColor} $rotateLineDown={isOpened} />

                <MiddleWrapper $removeLines={isOpened} $lineHeight={"14%"}>
                    <Line $smallSize={"100%"} $mediumSize={"50%"} $color={textColor} />
                    <Line $smallSize={"100%"} $mediumSize={"50%"} $color={textColor} />
                </MiddleWrapper >

                <Line $lastLine $smallSize={lineHeight} $mediumSize={"100%"} $color={textColor} $rotateLineUp={isOpened} />
            </Wrapper>
        </FadeInWrapper>
    );
};
