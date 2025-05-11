import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ResetCss } from '../../main/src/styles/reset-css.style';
import { FontStyles } from '../../main/src/styles/font.style';
import { GlobalStyles } from '../../main/src/styles/global.style';
import { Provider } from "react-redux";
import { store } from '../../main/src/store';
import AdminApp from './admin_app';

createRoot(document.getElementById('admin')!).render(
  <StrictMode>
    <ResetCss />
    <FontStyles />
    <GlobalStyles />
    <BrowserRouter>
      <Provider store={store}>
        <AdminApp />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);