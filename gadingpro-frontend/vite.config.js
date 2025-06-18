import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    allowedHosts: ['8c29-118-137-88-147.ngrok-free.app'],
  }
})
