import { ReactElement } from "react";
import { useThemeColors, ThemeColors } from "@shared/hooks/theme/useThemeColors";
import { CookieYesStylesType } from "@shared/styles/cookie-yes.style";
import { useCookieYes } from "@shared/hooks/theme/useCookieYes";

/**
 * `StyledCookieYesBanner`
 * 
 * React component that applies dynamic global styles to the CookieYes banner,
 * using colors from the current theme. It wraps the `CookieYesStyles` component
 * and automatically injects the necessary props derived from the `useThemeColors` hook.
 * 
 * This ensures the banner is styled consistently with the rest of the application.
 *
 * @returns {ReactElement} A React element that applies global CSS styles to the CookieYes banner.
 * 
 * @example
 * // Typically rendered once in your main layout or root component:
 * <StyledCookieYesBanner />
 * 
 * @see useThemeColors for color values injected into the component.
 * @see useCookieYes for script loading and component generation.
*/

export const StyledCookieYesBanner = (): ReactElement => {
    const { backgroundColorButton, backgroundColor, backgroundColorSecondary, textColor, borderColor, hoverColor, successMessageColor }
    : ThemeColors = useThemeColors();
    const CookieYesStyles: CookieYesStylesType = useCookieYes();

    return <CookieYesStyles 
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $buttonBackgorundColor={backgroundColorButton}
      $borderColor={borderColor}
      $hoverColor={hoverColor}
      $successMessageColor={successMessageColor}
      $secondaryBackgorundColor={backgroundColorSecondary}
    />
}