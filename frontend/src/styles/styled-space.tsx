import { ReactElement } from "react";
import { sizes } from "../config/sizes.config";
import styled from "styled-components";

type DividerProps = {
    $horizontal?: string;
    $vertical?: string;
};

const Divider = styled.div<DividerProps>`
    width: ${({ $horizontal }) => ($horizontal ? `${$horizontal} !important` : "auto")};
    height: ${({ $vertical }) => ($vertical ? $vertical : "0")};
    display: ${({ $vertical }) => ($vertical ? "block" : "inline-block")};
`;


type StyledSpaceProps = {
    horizontal?: boolean;
    vertical?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    verySmall?: boolean;
};

export const StyledSpace = ({ horizontal, vertical, small, medium, large, verySmall }: StyledSpaceProps): ReactElement => {
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

    return <Divider $horizontal={horizontal ? size : undefined} $vertical={vertical ? size : undefined} />;
};