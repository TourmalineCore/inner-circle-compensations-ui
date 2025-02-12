import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { federation } from '@module-federation/vite'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: 4003,
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
          entry: `http://localhost:4006/layout/mf-manifest.json`, // The URL where the manifest file for the remote application can be found
        },
      },
      shared: { // Used to define dependencies that should be shared between different applications
        react: {
          singleton: true, // Ensures that only one instance of React is used
        },
        'react/': {
          singleton: true, // Ensures that all modules starting with 'react/' also use the same instance
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
    build: {
      target: `chrome89`, // Setting the target browser version for the build
    },
  },
})
