import { ReactElement, useContext, useCallback, useEffect } from "react";
import styled from "styled-components";
import { sizes } from "../config/sizes.config";
import { colors } from "../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { MobileMenuContext, MobileMenuContextProps } from "../contexts/mobile-menu-context";
import { useMediaQuery, UseMediaQuery } from "../hooks/useMediaQuery";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1000;
`;

const Line = styled.div<{$smallSize: string, $mediumSize: string, $color: string, $lastLine?: boolean}>`
    width: ${({ $mediumSize }) => $mediumSize};
    height: ${({ $smallSize }) => $smallSize};
    background-color: ${({ $color }) => $color};
    margin-bottom: ${({ $lastLine }) => $lastLine ? "unset" : '0.8vh'};
`;

export const StyledMobileMenu = (): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const { setisOpened }: MobileMenuContextProps = useContext(MobileMenuContext);
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const color = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    const toggleMenu = useCallback(() => {
        if (setisOpened) {
            setisOpened(prevIsOpened => !prevIsOpened);
        }
    }, [setisOpened]);

    useEffect(() => {
        if (!isMobile || !isTablet) {
            setisOpened && setisOpened(false);
        }
    }, [isMobile, setisOpened]);

    return (
        <Wrapper onClick={toggleMenu}>
            <Line $smallSize={sizes.heights.small} $mediumSize={sizes.widths.small} $color={color} />
            <Line $smallSize={sizes.heights.small} $mediumSize={sizes.widths.small} $color={color} />
            <Line $lastLine $smallSize={sizes.heights.small} $mediumSize={sizes.widths.small} $color={color} />
        </Wrapper>
    );
};