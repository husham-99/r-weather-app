import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// Load environment variables
const baseUrl = process.env.VITE_BASE_URL || '/';



// https://vite.dev/config/
export default defineConfig({
  base: "/r-weather-app/",
 

  plugins: [react()],
})
