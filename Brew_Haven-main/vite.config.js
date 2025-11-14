import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // GitHub Pages ke liye BASE URL
  base: "/Brew_Haven/", 

  // server: {
  //   // host: '192.168.1.59',   // (optional) mobile testing ke liye
  //   port: 3000,
  // },
})