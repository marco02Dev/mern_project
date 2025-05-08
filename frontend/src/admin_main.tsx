import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ResetCss } from './styles/reset-css.style.ts';
import { FontStyles } from './styles/font.style.ts';
import { GlobalStyles } from './styles/global.style.ts';
import { Provider } from "react-redux";
import { store } from './store';
import AdminPanel from './admin/AdminPanel.tsx';

createRoot(document.getElementById('admin')!).render(
  <StrictMode>
    <ResetCss />
    <FontStyles />
    <GlobalStyles />
    <BrowserRouter>
      <Provider store={store}>
            <AdminPanel />
      </Provider>
    </ BrowserRouter>
  </StrictMode>
);
