import { ReactElement, useCallback, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { useDispatch, useSelector } from "react-redux"; 
import { toggleMenu, closeMenu } from "../../store/slices/menu.slice";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { RootState } from "../../store";
import { removeMiddleLines, rotateLineDown, rotateLineUp, restoreRotatedLine } from "../../animations/menu-in-arrow.animation";
import { restoreMiddleLines } from "../../animations/menu-in-arrow.animation";
import { FadeInWrapper } from "../animated/FadeInWrapper";

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


export const StyledMobileMenu = (): ReactElement => {
    const isOpened = useSelector(({menu}: RootState) => menu.isOpened);
    const dispatch = useDispatch();

    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();

    const color = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;
    const lineHeight: string = '14%';

    const toggleMenuHandler = useCallback(() => {
        dispatch(toggleMenu()); 
    }, [dispatch]);

    useEffect(() => {
        if (!isMobile || !isTablet) {
            dispatch(closeMenu()); 
        }
    }, [isMobile, isTablet]);

    return (
        <FadeInWrapper>
            <Wrapper $isOpened={isOpened} onClick={toggleMenuHandler}>
                <Line $smallSize={lineHeight} $mediumSize={"100%"} $color={color} $rotateLineDown={isOpened} />

                <MiddleWrapper $removeLines={isOpened} $lineHeight={"14%"}>
                    <Line $smallSize={"100%"} $mediumSize={"50%"} $color={color} />
                    <Line $smallSize={"100%"} $mediumSize={"50%"} $color={color} />
                </MiddleWrapper >

                <Line $lastLine $smallSize={lineHeight} $mediumSize={"100%"} $color={color} $rotateLineUp={isOpened} />
            </Wrapper>
        </FadeInWrapper>
    );
};
