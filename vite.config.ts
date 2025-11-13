/* eslint-disable @typescript-eslint/quotes */
import { defineConfig } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// description about how to set up configuration you can see in 
// https://github.com/TourmalineCore/inner-circle-books-ui/blob/master/vite.config.ts (host app)
// and https://github.com/TourmalineCore/inner-circle-layout-ui/blob/master/vite.config.ts (remote app)

const LOCAL_ENV_PORT = 30090
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
      name: "inner_circle_compensations_ui",
      filename: "inner_circle_compensations_ui.js",
      remotes: {
        inner_circle_layout_ui: `/layout/assets/inner_circle_layout_ui.js`,
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
    target: `esnext`,
  },
})
