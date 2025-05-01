import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../frontend.env') })

const envVariables: Record<string, string> = Object.keys(process.env)
  .filter((key) => key.startsWith('VITE_'))
  .reduce((acc, key) => {
    acc[key] = process.env[key]!
    return acc
  }, {} as Record<string, string>)

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: {},
    host: '0.0.0.0',
    port: 4000,
  },
  define: {
    'process.env': envVariables,
  },
})
