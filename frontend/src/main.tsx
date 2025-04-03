import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeModeProvider } from './contexts/theme-mode.context.tsx';
import { MobileMenuContextProvider } from './contexts/mobile-menu-context.tsx';
import { ResetCss } from './styles/reset-css.ts';
import { FontStyles } from './styles/font-styles.ts';
import { GlobalStyles } from './styles/global-styles.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResetCss />
    <FontStyles />
    <GlobalStyles />
    <BrowserRouter>
      <MobileMenuContextProvider>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
      </MobileMenuContextProvider>
    </BrowserRouter>
  </StrictMode>
);
