/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../../../cypress/support/commands';

import CreateCompensationsState from '../../state/CreateCompensationsState';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

import ListTypesCompensations from './ListTypesCompensations';

const INITIAL_TYPES = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'German',
    value: 'german',
  },
  {
    label: 'Swimming',
    value: 'swimming',
  },
  {
    label: 'Water',
    value: 'water',
  },
  {
    label: 'Coworking',
    value: 'coworking',
  },
  {
    label: 'Massage',
    value: 'massage',
  },
  {
    label: 'Products',
    value: 'products',
  },
  {
    label: 'Consumables',
    value: 'consumables',
  },
  {
    label: 'Periphery',
    value: 'periphery',
  },
  {
    label: 'Business trip',
    value: 'businessTrip',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

describe('ListTypesCompensations', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('list-types-compensations')
      .should('exist');
  });

  it('SHOULD render list of compensation types WHEN have types data', () => {
    mountComponent();

    cy.getByData('list-types-compensations')
      .children()
      .should('have.length', 11);
  });

  it('SHOULD have focused element "english" WHEN click on type "english"', () => {
    mountComponent();

    cy.getByData('type-compensation-english')
      .click()
      .focused();
  });
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  createCompensationsState.initializeTypes({
    loadedTypes: INITIAL_TYPES,
  });

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <ListTypesCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
