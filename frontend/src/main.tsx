import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeModeProvider } from './contexts/ThemeModeProvider.tsx';
import { ResetCss } from './styles/reset-css.style.ts';
import { FontStyles } from './styles/font.style.ts';
import { GlobalStyles } from './styles/global.style.ts';
import { Provider } from "react-redux";
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <ResetCss />
    <FontStyles />
    <GlobalStyles />

    <BrowserRouter>
      <Provider store={store}>
          <ThemeModeProvider>
            <App />
          </ThemeModeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
