import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeModeProvider } from './contexts/theme-mode.context.tsx';
import './font.css'
import "./reset.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>
);
