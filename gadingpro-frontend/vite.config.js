import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { 
    host: true, // Ini akan membuat Vite mendengarkan di semua alamat IP yang tersedia
    allowedHosts: true
  },
  envPrefix: 'VITE_',
})
