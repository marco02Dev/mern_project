import { ReactElement, FC } from "react";
import styled from "styled-components";
import { ThemeColors, useThemeColors } from "../../hooks/useThemeColors";

type WrapperProps = {
    $backgroundColor: string,
}

const Wrapper = styled.div<WrapperProps>`
    background-color: ${({$backgroundColor}) => $backgroundColor};
`;

export const StyledWrapper: FC<{children: ReactElement[]}> = ({children}: {children: ReactElement[]}): ReactElement => {
    const { backgroundColor }: ThemeColors = useThemeColors()

    return <Wrapper $backgroundColor={backgroundColor}>
        {children}
    </Wrapper>
}