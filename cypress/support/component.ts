import './commands'

// @ts-ignore
window.__ENV__ = {
  API_ROOT: `http://test.com/api`,
  LINK_TO_COMPENSATIONS_SERVICE: `/`,
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
