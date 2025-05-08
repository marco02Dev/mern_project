import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../frontend.env') })

const envVariables: Record<string, string> = Object.keys(process.env)
  .filter((key) => key.startsWith('VITE_'))
  .reduce((acc, key) => {
    acc[key] = process.env[key]!
    return acc
  }, {} as Record<string, string>)

export default defineConfig({
  base: './', 
  plugins: [react(), mkcert()],
  server: {
    https: {},
    host: '0.0.0.0',
    port: 4000,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin_index.html')
      },
    },
  },
  define: {
    'process.env': envVariables,
  },
})
