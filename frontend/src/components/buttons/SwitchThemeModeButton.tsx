import { ReactElement, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setMode } from "../../store/slices/theme-mode.slice";
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
    const mode = useSelector((state: RootState) => state.themeMode.mode);
    const dispatch = useDispatch();

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        dispatch(setMode(newMode));
        setCookie('themeMode', newMode);
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

