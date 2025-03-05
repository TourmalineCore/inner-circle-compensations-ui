/* eslint-disable @typescript-eslint/quotes */
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const LOCAL_ENV_PORT = 40100
const COMPENSATIONS_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4003

// const LAYOUT_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4006

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: COMPENSATIONS_PORT,
  },
  // base: `/`, // for local docker
  base: `/compensations`, // for local-env
  plugins: [
    react(),
    svgr(),
    federation({
      // Unique name for the application
      name: "inner_circle_compensations_ui",
      filename: "inner_circle_compensations_ui.js",
      // The path where the remote application file can be found and its name
      remotes: {
        // inner_circle_layout_ui: `http://localhost:4455/assets/inner_circle_layout_ui.js`, // for local docker
        // inner_circle_layout_ui: `http://localhost:${LOCAL_ENV_PORT}/layout/assets/inner_circle_layout_ui.js`, // for local-env
        inner_circle_layout_ui: `${process.env.VITE_DEV_HOST}/layout/assets/inner_circle_layout_ui.js`, // for prod
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
    define: {
      'import.meta.env.VITE_DEV_HOST': JSON.stringify(process.env.VITE_DEV_HOST),
    },
  },
  build: {
    // Setting the target browser version for the build
    target: `esnext`,
  },
})
