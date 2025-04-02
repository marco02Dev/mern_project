import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { sizes } from "../config/sizes.config";
import { colors } from "../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Line = styled.div<{$smallSize: string, $mediumSize: string, $color: string, $lastLine?: boolean}>`
    width: ${({ $mediumSize }) => $mediumSize};
    height: ${({ $smallSize }) => $smallSize};
    background-color: ${({ $color }) => $color};
    margin-bottom: ${({ $lastLine }) => $lastLine ? "unset" : '0.8vh'};
`;

export const StyledMobileMenu = (): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color = mode === 'dark' ? colors.dark.textColor : colors.light.textColor;

    return (
        <Wrapper>
            <Line $smallSize={sizes.heights.verySmall} $mediumSize={sizes.widths.small} $color={color} />
            <Line $smallSize={sizes.heights.verySmall} $mediumSize={sizes.widths.small} $color={color} />
            <Line $lastLine $smallSize={sizes.heights.verySmall} $mediumSize={sizes.widths.small} $color={color} />
        </Wrapper>
    );
};
