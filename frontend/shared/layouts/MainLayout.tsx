import { ReactElement, StrictMode } from "react";
import { ResetCss } from "@shared/styles/reset-css.style";
import { FontStyles } from "@shared/styles/font.style";
import { GlobalStyles } from "@shared/styles/global.style";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@shared/store";

export const MainLayout = ({children}: {children: ReactElement}) => {
    return <StrictMode>
    <ResetCss />
    <FontStyles />
    <GlobalStyles />

    <BrowserRouter>
      <Provider store={store}>
            {children}
      </Provider>
    </BrowserRouter>
  </StrictMode>
}