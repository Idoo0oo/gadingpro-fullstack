import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Pastikan port ini sesuai dengan yang Anda gunakan
    host: true, // Ini akan membuat Vite mendengarkan di semua alamat IP yang tersedia
    allowedHosts: true // IZINKAN SEMUA HOST (termasuk ngrok)
  }
});