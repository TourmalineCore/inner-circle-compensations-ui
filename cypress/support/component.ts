import './commands'

// @ts-ignore
window.__ENV__ = {
  API_ROOT: `http://test.com/api`,
  VITE_API_ROOT_AUTH: `http://test.com/auth-api`,
  LINK_TO_ACCOUNT_SERVICE: `/`,
  LINK_TO_COMPENSATIONS_SERVICE: `/`,
  VITE_BASE_URL: `http://localhost:4455`,
  LINK_TO_SALARY_SERVICE: `/`,
}

/// <reference types="cypress" />

// styles
import 'react-datepicker/dist/react-datepicker.css'

import '../../src/styles/index.scss'

// commands
import { mount } from 'cypress/react'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
    }
  }
}

Cypress.Commands.add(`mount`, mount)
