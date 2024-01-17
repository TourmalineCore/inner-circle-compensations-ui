/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../../../cypress/support/commands';

import CompensationsAllState from '../../../../state/CompensationsAllState';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

import MarkAsPaidButton from './MarkAsPaidButton';

const initialData = [
  {
    id: 55,
    compensationType: 'English',
    comment: 'I bought milk',
    amount: 760,
    dateCreateCompensation: '2023-12-19T06:56:49Z',
  },
  {
    id: 56,
    compensationType: 'German',
    comment: 'I bought this',
    amount: 2760.45,
    dateCreateCompensation: '2023-12-19T06:56:49Z',
  },
];

describe('MarkAsPaidButton', () => {
  it(`
  GIVEN compensations all page 
  WHEN visit compensations page
  THEN render component
  `, () => {
    mountComponent();

    cy.getByData('mark-as-paid-button-submit')
      .should('exist');
  });

  it(`
  GIVEN compensations all page
  WHEN click on button
  THEN this button should be in focus
  `, () => {
    mountComponent();

    cy.getByData('mark-as-paid-button-submit')
      .last()
      .click();

    cy.getByData('mark-as-paid-button-submit')
      .last()
      .focused();
  });
});

function mountComponent() {
  const compensationsAllState = new CompensationsAllState();

  cy.mount(
    <CompensationsAllStateContext.Provider value={compensationsAllState}>
      <MarkAsPaidButton compensations={initialData} />
    </CompensationsAllStateContext.Provider>,
  );
}
