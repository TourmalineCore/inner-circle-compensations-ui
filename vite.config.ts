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
      name: "inner_circle_compensations_ui", // Unique name for the application
      remotes: {
        // inner_circle_layout_ui: `http://localhost:4455/assets/inner_circle_layout_ui.js`, // for local docker
        inner_circle_layout_ui: `http://localhost:${LOCAL_ENV_PORT}/layout/assets/inner_circle_layout_ui.js`, // for local-env
      },
      shared: [
        "react",
      ],

      /* singleton: true: This setting ensures that only a single instance of the specified module 
      (in this case, react) is loaded in the application. 
      If multiple applications try to load their own version of React, 
      this setting prevents that by sharing the same instance across all applications */
    }),
  ],
  // define: {
  //   'import.meta.env.VITE_BASE_PATH': JSON.stringify(
  //     process.env.NODE_ENV === `production` ? `/compensations` : ``,
  //   ),
  // },
  build: {
    target: `chrome89`, // Setting the target browser version for the build
  },
})
