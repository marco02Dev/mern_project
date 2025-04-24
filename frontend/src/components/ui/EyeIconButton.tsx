import { FC, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    return <Wrapper onClick={togglePasswordVisibility}>
        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} 
    </Wrapper>
}