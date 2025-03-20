/* eslint-disable @typescript-eslint/quotes */
import { defineConfig } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const LOCAL_ENV_PORT = 40100
const COMPENSATIONS_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4003

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: COMPENSATIONS_PORT,
  },
  base: `/compensations`,
  plugins: [
    react(),
    svgr(),
    federation({
      // Unique name for the application
      name: "inner_circle_compensations_ui",
      filename: "inner_circle_compensations_ui.js",
      // The path where the remote application file can be found and its name
      remotes: {
        inner_circle_layout_ui: `${process.env.VITE_BASE_URL}/layout/assets/inner_circle_layout_ui.js`,
      },
      shared: [
        "react",
      ],
    }),
  ],
  define: {
    'import.meta.env.VITE_BASE_PATH': JSON.stringify(
      process.env.NODE_ENV === `production` ? `/compensations` : ``,
    ),
  },
  build: {
    // Setting the target browser version for the build
    target: `esnext`,
  },
})
