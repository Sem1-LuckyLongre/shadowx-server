import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    port: 5173,
    allowedHosts:['h2dmtg-5173.csb.app']
  }
})
