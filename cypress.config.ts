import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    baseUrl: 'http://localhost:4003',
    env: {
      API_ROOT: process.env.API_ROOT,
      LINK_TO_COMPENSATIONS_SERVICE: process.env.LINK_TO_COMPENSATIONS_SERVICE,
    },
    video: false,
    setupNodeEvents(on, config) {},
  },
  component: {
    video: false,
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
