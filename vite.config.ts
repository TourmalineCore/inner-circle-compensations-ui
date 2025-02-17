import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { federation } from '@module-federation/vite'

const LOCAL_ENV_PORT = 40100
const COMPENSATIONS_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4003
const LAYOUT_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4006

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
      name: `inner_circle_compensations_ui`, // Unique name for the application
      manifest: true,
      remotes: {
        inner_circle_layout_ui: {
          type: `module`,
          name: `inner_circle_layout_ui`, // The unique name of the remote application that will be used for identification
          entry: `http://localhost:${LAYOUT_PORT}/layout/remoteEntry.js`, // The URL where the manifest file for the remote application can be found
        },
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: `^18.2.0`,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: `^18.2.0`,
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: `^6.2.2`,
        },
        'react/jsx-runtime': {
          singleton: true,
          requiredVersion: `^18.2.0`,
        },
      },

      /* singleton: true: This setting ensures that only a single instance of the specified module 
      (in this case, react) is loaded in the application. 
      If multiple applications try to load their own version of React, 
      this setting prevents that by sharing the same instance across all applications */
    }),
  ],
  define: {
    'import.meta.env.VITE_BASE_PATH': JSON.stringify(
      process.env.NODE_ENV === `production` ? `/compensations` : ``,
    ),
  },
  build: {
    target: `chrome89`, // Setting the target browser version for the build
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        /^__mf__virtual\/.*/,
        `react`,
        `react-dom`,
        `react-router-dom`,
        `react/jsx-runtime`,
        `/compensations/env-config.js`,
        `inner_circle_layout_ui/layout`,
        `/node_modules`,
      ],
      output: {
        format: `es`,
        sanitizeFileName: (file) => file,
      },
    },
  },
})
