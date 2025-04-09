import { ReactElement, useContext, FC } from "react";
import { sizes } from "../../config/sizes.config";
import styled from "styled-components";
import { colors } from "../../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";

type DividerProps = {
    $horizontal?: string;
    $vertical?: string;
    $width?: string;
    $backgroundColor: string;
    $height?: string;
};

const Divider = styled.div<DividerProps>`
    width: ${({ $horizontal, $width, $vertical }) => {
        if($horizontal && !$width) {
            return ($horizontal ? `${$horizontal} !important` : "auto")
        } else if($width && $vertical) {
            return `${$width}`;
        }
    }};
    height: ${({ $vertical, $height }) => { 
        if($vertical && !$height) {
            return ($vertical ? $vertical : "0")
        } else if($vertical && $height) {
            return `${$height}`
        }


    }};
    display: ${({ $vertical }) => ($vertical ? "block" : "inline-block")};
    width: ${({$width}) => $width ? $width : ""};
    background-color: ${({$backgroundColor}) => $backgroundColor ? $backgroundColor : ""};
`;


type StyledSpaceProps = {
    horizontal?: boolean;
    vertical?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    verySmall?: boolean;
    width?: string;
    backgroundColor?: boolean;
    height?: string
};

export const StyledSpace: FC<StyledSpaceProps> = ({ horizontal, vertical, small, medium, large, verySmall, width, backgroundColor, height }: StyledSpaceProps): ReactElement => {
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color = mode === 'dark' ? colors.dark.backgroundColor : colors.light.backgroundColor;

    let size: string;

    if (small) {
        size = sizes.spaces.small;
    } else if (medium) {
        size = sizes.spaces.medium;
    } else if (large) {
        size = sizes.spaces.large;
    } else if(verySmall) {
        size = sizes.spaces.verySmall;
    } else {
        size = sizes.spaces.small;
    }

    return <Divider $height={height} $backgroundColor={backgroundColor ? color : "unset"} $width={width} $horizontal={horizontal ? size : undefined} $vertical={vertical ? size : undefined} />;
};