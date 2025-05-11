import { ReactElement, FC } from "react";
import styled from "styled-components";
import { useThemeColors, ThemeColors } from "../../hooks/theme/useThemeColors";

const Wrapper = styled.div<{$color: string}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    border-bottom: 0.6vh solid ${({$color}) => $color};
    border-right: 0.6vh solid ${({$color}) => $color};
    clip-path: inset(0.6vh 0% 0% 0.6vh);
`;

export const StyledShadow: FC = (): ReactElement => {
    const { borderColor }: ThemeColors = useThemeColors({invertColors: {textColor: true}});

    return <Wrapper $color={borderColor} />
}