import { defineConfig } from 'cypress'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:30090`,
    env: {
      API_ROOT: `/api`,
      API_ROOT_AUTH: `/api/auth`,
      LINK_TO_COMPENSATIONS_SERVICE: `/compensations`,
      USER_LOGIN: `ceo@tourmalinecore.com`,
      USER_PASSWORD: `cEoPa$$wo1d`,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
})