import { useEffect } from 'react';
import { cookieYesID } from './../../config/app.config';

export const useCookieYes = (): void => {
  useEffect(() => {

    if (!cookieYesID) {
      console.warn('CookieYes ID non trovato in VITE_cookieYesID');
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
};
