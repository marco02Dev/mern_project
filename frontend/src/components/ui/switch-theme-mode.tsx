import { ReactElement, useContext, useEffect } from "react";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/theme-mode.context";
import sun from "../../images/svg/sun.svg";
import moon from "../../images/svg/moon.svg";
import styled, { createGlobalStyle } from "styled-components";
import { sizes } from "../../config/sizes.config";
import { useInView } from "../../hooks/useViewIn";
import { fadeIn } from "../../animations/fade-in";

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
    opacity: 0;
    ${() => fadeIn}
    img {
        width: ${(({$imageSize}) => $imageSize)};
        height: ${(({$imageSize}) => $imageSize)};
    }
`;

export const SwitchThemeMode = (): ReactElement => {
    const { mode, setMode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const [ref, isInView] = useInView()

    const toggleTheme = () => {
        if(setMode) {
            setMode(mode === "light" ? "dark" : "light");
        }
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
            <Button ref={ref} className={isInView ? "in-view" : ""} onClick={toggleTheme} $imageSize={sizes.widths.small}>
                <img width={20} height={20} src={mode === "light" ? sun : moon} alt="theme-icon" className="w-6 h-6" />
            </Button>
        </>
    );
};

