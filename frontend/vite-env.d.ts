declare module 'validator';
declare module 'validator/lib/isEmail';
interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_DEV_ENDPOINT: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
