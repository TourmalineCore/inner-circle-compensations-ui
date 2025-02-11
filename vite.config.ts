import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: 4003,
  },
  base: `/compensations`,
  plugins: [
    react(),
    svgr(),
  ],
  define: {
    'import.meta.env.VITE_BASE_PATH': JSON.stringify(
      `/compensations`,
    ),
  },
})
