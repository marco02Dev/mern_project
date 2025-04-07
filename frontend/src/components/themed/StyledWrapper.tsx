import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";

type WrapperProps = {
    $backgroundColor: string,
}

const Wrapper = styled.div<WrapperProps>`
    background-color: ${({$backgroundColor}) => $backgroundColor};
`;

export const StyledWrapper = ({children}: {children: ReactElement[]}): ReactElement => {
    const ThemeModeValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const {mode} = ThemeModeValue;
    const backgroundColor = mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;

    return <Wrapper $backgroundColor={backgroundColor}>
        {children}
    </Wrapper>
}