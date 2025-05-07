import { FC, MouseEventHandler, ReactElement } from "react";
import styled, { StyledObject } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sizes } from "../../config/sizes.config";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";

const Wrapper = styled.div`
    position: absolute;
    right: 1vh;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer; 
`;

type EyeIconButtonProps = {
    isPasswordVisible: boolean,
    togglePasswordVisibility: MouseEventHandler<HTMLDivElement>
}

export const EyeIconButton: FC<EyeIconButtonProps> = ({isPasswordVisible, togglePasswordVisibility}: EyeIconButtonProps): ReactElement => {
    const { textColor }: ThemeColors = useThemeColors();
    const size: StyledObject = {width: sizes.widths.verySmall, height: sizes.widths.verySmall}

    return <Wrapper onClick={togglePasswordVisibility}>
        {isPasswordVisible ? <FaEyeSlash color={textColor} style={size} /> : <FaEye color={textColor} style={size} />} 
    </Wrapper>
}