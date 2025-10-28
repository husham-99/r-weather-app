import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/r-weather-app/",
  loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
  plugins: [react()],
})
