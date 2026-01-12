import { defineConfig } from "cypress"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: `cypress/e2e/**/*.cy.ts`,
    baseUrl: process.env.CYPRESS_BASE_URL,
    env: {
      API_ROOT_URL: process.env.API_ROOT_URL,
      AUTH_API_ROOT_URL: process.env.AUTH_API_ROOT_URL,
      USER_LOGIN: process.env.USER_LOGIN,
      USER_PASSWORD: process.env.USER_PASSWORD,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
  component: {
    video: false,
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
  },
})
