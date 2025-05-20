import { ReactElement, StrictMode } from "react";
import { ResetCss } from "@shared/styles/reset-css.style";
import { FontStyles } from "@shared/styles/font.style";
import { GlobalStyles } from "@shared/styles/global.style";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@shared/store";

/**
 * `MainLayout` is the root layout component for the application.
 *
 * It wraps the app with essential global providers and styles, including:
 * 
 * - `<StrictMode>` for highlighting potential problems in development.
 * - `ResetCss` for normalizing styles across browsers (Meyer reset).
 * - `FontStyles` for applying the main font across all elements.
 * - `GlobalStyles` for setting app-wide layout and behavior (e.g. hiding scrollbars).
 * - `StyledCookieYesBanner` conditionally included in production to apply theming to the CookieYes banner.
 * - `BrowserRouter` from `react-router-dom` to handle routing.
 * - `Provider` from `react-redux` to make the shared Redux store available throughout the app.
 *
 * @param {Object} props
 * @param {ReactElement} props.children - The entire app or route tree to render within the layout.
 *
 * @returns {ReactElement} The fully wrapped app with global styles and providers.
 *
 * @example
 * <MainLayout>
 *   <AppRoutes />
 * </MainLayout>
*/

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