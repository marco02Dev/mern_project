import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";

const Wrapper = styled.div<{$backgroundColor: string}>`
    background-color: ${({$backgroundColor}) => $backgroundColor};
`;

export const StyledMainWrapper = ({children}: {children: ReactElement}): ReactElement => {
    const ThemeModeValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const {mode} = ThemeModeValue;
    const backgroundColor = mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;

    return <Wrapper $backgroundColor={backgroundColor}>
        {children}
    </Wrapper>
}