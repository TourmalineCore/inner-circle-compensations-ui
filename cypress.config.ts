import { defineConfig } from "cypress"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: `cypress/e2e/**/*.cy.ts`,
    baseUrl: process.env.CYPRESS_BASE_URL,
    env: {
      API_ROOT: process.env.API_ROOT,
      LINK_TO_COMPENSATIONS_SERVICE: process.env.LINK_TO_COMPENSATIONS_SERVICE,
      API_ROOT_AUTH: process.env.API_ROOT_AUTH,
      USER_LOGIN: process.env.USER_LOGIN,
      USER_PASSWORD: process.env.USER_PASSWORD,
    },
    video: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) { },
  },
  component: {
    video: false,
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
  },
})
