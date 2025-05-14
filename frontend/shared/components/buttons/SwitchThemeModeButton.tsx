import { ReactElement, FC } from "react";
import { UseThemeModeToggle, useThemeModeToggle } from "../../hooks/theme/useThemeModeToggle";
import { UseThemeModeTransitionEffect, useThemeModeTransitionEffect } from "../../hooks/theme/useThemeModeTransitionEffect";
import styled from "styled-components";
import { sizes } from "@shared/config/sizes.config";
import { FadeInWrapper } from "../animated/FadeInWrapper";

const Button = styled.button<{$imageSize: string}>`
    background-color: transparent;
    border: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        width: ${(({$imageSize}) => $imageSize)};
        height: ${(({$imageSize}) => $imageSize)};
    }
`;

type SwitchThemeModeButtonProps = {
    delay?: string
}

export const SwitchThemeModeButton: FC<SwitchThemeModeButtonProps> = ({
    delay
}: SwitchThemeModeButtonProps): ReactElement => {
    const { mode, toggleTheme }: UseThemeModeToggle = useThemeModeToggle();
    const { ThemeModeTransitionStyles }: UseThemeModeTransitionEffect = useThemeModeTransitionEffect(mode);

    return (
        <>
            <ThemeModeTransitionStyles />
            <FadeInWrapper flex delay={delay}>
                <Button onClick={toggleTheme} $imageSize={sizes.widths.small}>
                    <img 
                        width={20} 
                        height={20} 
                        src={mode === "light" 
                            ? "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746271646/sun_rej5by.svg" 
                            : "https://res.cloudinary.com/dqwoo44z8/image/upload/v1746271641/moon_kccoqn.svg"
                        } 
                        alt="theme-icon" className="w-6 h-6" />
                </Button>
            </FadeInWrapper>
        </>
    );
};

