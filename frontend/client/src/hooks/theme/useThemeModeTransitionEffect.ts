import { NamedExoticComponent, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

type ThemeModeTransitionStylesProps = {
  $cookieYesButtonsBackgroundColor: string
}

const ThemeModeTransitionStyles: NamedExoticComponent<ThemeModeTransitionStylesProps> = createGlobalStyle<ThemeModeTransitionStylesProps>`
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
  .cky-btn-revisit-wrapper {
    background-color: ${({$cookieYesButtonsBackgroundColor}) => $cookieYesButtonsBackgroundColor};
  }
`;

export type UseThemeModeTransitionEffect = {
    ThemeModeTransitionStyles: NamedExoticComponent<ThemeModeTransitionStylesProps>
};

export const useThemeModeTransitionEffect = (mode: string): UseThemeModeTransitionEffect => {

  useEffect(() => {
      document.body.style.transition = "color 0.5s ease, background-color 0.5s ease, opacity 0.5s ease";
      document.body.style.opacity = "0";
      const timeout = setTimeout(() => {
          document.body.style.opacity = "1";
      }, 100);

      return () => clearTimeout(timeout);
  }, [mode]);

  return {
      ThemeModeTransitionStyles: ThemeModeTransitionStyles
  }
};