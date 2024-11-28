import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();


// https://vite.dev/config/
export default defineConfig(() =>{
  const backendUrl = process.env.VITE_BACKEND_URL;

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    esbuild: {
      jsx: 'automatic',
    },    
    server: {
      proxy: {
        '/api': {
          target: backendUrl, // Replace with your backend URL
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }

})
