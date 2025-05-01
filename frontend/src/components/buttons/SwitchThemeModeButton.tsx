import { ReactElement, useContext, useEffect, FC } from "react";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import styled, { createGlobalStyle } from "styled-components";
import { sizes } from "../../config/sizes.config";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { setCookie } from "../../utils/cookies/set-cookie";

const GlobalStyle = createGlobalStyle`
  * {
    transition: color 0.5s ease, background-color 0.5s ease, opacity 0.5s ease;
    opacity: 1; 
  };
  body {
    transition: color 0.5s ease, background-color 0.5s ease, opacity 0.5s ease;
    opacity: 1;
  };
  a {
    transition: background-color 0.5s ease !important;
  }
`;

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


export const SwitchThemeModeButton: FC<SwitchThemeModeButtonProps> = ({delay}: SwitchThemeModeButtonProps): ReactElement => {
    const { mode, setMode }: ThemeModeContextProps = useContext(ThemeModeContext);

    const toggleTheme = () => {
        if(setMode) {
            setMode(mode === "light" ? "dark" : "light");
        }

        setCookie('themeMode', mode === "light" ? "dark" : "light");
    };

    useEffect(() => {
        document.body.style.transition = "color 0.5s ease, background-color 0.5s ease, opacity 0.5s ease";
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1'; 
        }, 100); 
    }, [mode]);

    return (
        <>
            <GlobalStyle />
            <FadeInWrapper flex delay={delay}>
                <Button onClick={toggleTheme} $imageSize={sizes.widths.small}>
                    <img width={20} height={20} src={mode === "light" ? "/icons/sun.svg" : "/icons/moon.svg"} alt="theme-icon" className="w-6 h-6" />
                </Button>
            </FadeInWrapper>
        </>
    );
};

