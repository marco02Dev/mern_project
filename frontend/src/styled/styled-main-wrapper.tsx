import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { ThemeModeContext, ThemeModeContextProps } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";
import { sizes } from "../config/sizes.config";

type WrapperProps = {
    $backgroundColor: string,
    $smallSpace: string,
    $mediumSpace: string
}

const Wrapper = styled.div<WrapperProps>`
    background-color: ${({$backgroundColor}) => $backgroundColor};
    padding-left: ${({$smallSpace}) => $smallSpace};
    padding-right: ${({$smallSpace}) => $smallSpace};
    padding-top: ${({$mediumSpace}) => $mediumSpace};
    padding-bottom: ${({$mediumSpace}) => $mediumSpace}
`;

export const StyledMainWrapper = ({children}: {children: ReactElement[]}): ReactElement => {
    const ThemeModeValue: ThemeModeContextProps = useContext(ThemeModeContext);
    const {mode} = ThemeModeValue;
    const backgroundColor = mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;

    return <Wrapper $backgroundColor={backgroundColor} $smallSpace={sizes.spaces.small} $mediumSpace={sizes.spaces.medium}>
        {children}
    </Wrapper>
}