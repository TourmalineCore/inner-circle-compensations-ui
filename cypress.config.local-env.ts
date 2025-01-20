/* eslint-disable no-useless-escape */
/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/default-param-last */
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    video: false,
    screenshotOnRunFailure: true,
    viewportHeight: 600,
    viewportWidth: 1000,
  },

  e2e: {
    baseUrl: 'http://localhost:40100',
    env: {
      API_ROOT: '/api',
      API_ROOT_AUTH: '/api/auth',
      LINK_TO_COMPENSATIONS_SERVICE: '/compensations',
      USER_LOGIN: 'ceo@tourmalinecore.com',
      USER_PASSWORD: 'cEoPa$$wo1d',
    },
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on) {
      on(
        'before:browser:launch',
        (
          browser = {
            name: '',
            family: 'chromium',
            channel: '',
            displayName: '',
            version: '',
            majorVersion: '',
            path: '',
            isHeaded: false,
            isHeadless: false,
          },
          launchOptions,
        ) => {
          if (browser.family === 'chromium') {
            launchOptions.args.push(
            );
          }

          return launchOptions;
        },
      );
    },
  },
});
