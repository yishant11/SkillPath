import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Alias "framer" → local shim so the component compiles outside Framer
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      framer: path.resolve(__dirname, 'framer.ts'),
    },
  },
})
