import { useEffect } from 'react';
import { cookieYesID } from '@shared/config/env.config';
import { CookieYesStylesType, CookieYesStyles } from '@shared/styles/cookie-yes.style';

/**
 * Custom hook that dynamically loads the CookieYes script.
 * 
 * This hook adds a script tag to the document's head to load the CookieYes client script
 * if the `cookieYesID` is provided. It also ensures the script is removed when the component is unmounted.
 * 
 * @returns The `CookieYesStyles` component, which applies global styles to the CookieYes banner. 
 * See the `CookieYesStylesType` for more details on the component's props and how the styles are dynamically applied based on the theme.
 * 
 * @example
 * const CookieYesStyles: CookieYesStylesType = useCookieYes();
 * 
 * return <CookieYesStyles 
    $backgroundColor={backgroundColor}
    $textColor={textColor}
    $buttonBackgorundColor={backgroundColorButton}
    $borderColor={borderColor}
    $hoverColor={hoverColor}
    $successMessageColor={successMessageColor}
    $secondaryBackgorundColor={backgroundColorSecondary}
  />}
 * 
 * @note If the `cookieYesID` is not found, a warning is logged in the console.
*/

export const useCookieYes = (): CookieYesStylesType => {
  useEffect(() => {

    if (!cookieYesID) {
      console.warn('CookieYes ID not found');
      return;
    }

    if (document.getElementById('cookieyes')) return;

    const script = document.createElement('script');
    script.id = 'cookieyes';
    script.type = 'text/javascript';
    script.src = `https://cdn-cookieyes.com/client_data/${cookieYesID}/script.js`;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('cookieyes');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return CookieYesStyles;
};
