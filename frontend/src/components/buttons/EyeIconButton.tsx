import { FC, MouseEventHandler, ReactElement, useContext } from "react";
import styled, { StyledObject } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sizes } from "../../config/sizes.config";
import { ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";

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
    const { mode } = useContext(ThemeModeContext);
    const size: StyledObject = {width: sizes.widths.verySmall, height: sizes.widths.verySmall}
    const color = mode === "dark" ? colors.dark.textColor : colors.light.textColor;

    return <Wrapper onClick={togglePasswordVisibility}>
        {isPasswordVisible ? <FaEyeSlash color={color} style={size} /> : <FaEye color={color} style={size} />} 
    </Wrapper>
}