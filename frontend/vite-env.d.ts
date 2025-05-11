declare module 'validator';
declare module 'validator/lib/isEmail';
declare module 'react-dom/client';
declare module 'vite';
declare module '@vitejs/plugin-react';
declare module 'vite-plugin-mkcert';
declare module 'path';
interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_DEV_ENDPOINT: string;
    readonly VITE_COOKIEYES_ID: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly url: string;
  }