import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
      environment: 'jsdom', // імітує браузерне середовище (DOM) для тестів
      globals: true,        // дозволяє писати test()/expect() без імпорту в кожному файлі
  },
})
