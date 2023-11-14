/* eslint-disable react/jsx-no-constructed-context-values */
import CreateCompensationsState from '../../state/CreateCompensationsState';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';
import TableCreateCompensations from './TableCreateCompensations';

const INITIAL_TYPES = [
  {
    typeId: 1,
    label: 'English',
  },
  {
    typeId: 2,
    label: 'German',
  },
  {
    typeId: 3,
    label: 'Swimming',
  },
  {
    typeId: 4,
    label: 'Water',
  },
  {
    typeId: 5,
    label: 'Coworking',
  },
  {
    typeId: 6,
    label: 'Massage',
  },
  {
    typeId: 7,
    label: 'Products',
  },
  {
    typeId: 8,
    label: 'Consumables',
  },
  {
    typeId: 9,
    label: 'Periphery',
  },
  {
    typeId: 10,
    label: 'Business trip',
  },
  {
    typeId: 11,
    label: 'Other',
  },
];

describe('TableCreateCompensations', () => {
  it('SHOULD render component WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations')
      .should('exist');
  });

  it('SHOULD render table header WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-head')
      .children()
      .should('have.length', 4);
  });

  it('SHOULD render empty compensation item on table WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-item')
      .children()
      .should('have.length', 4);

    cy.getByData('table-create-compensations-select')
      .should('have.value', null);

    cy.getByData('table-create-compensations-comment')
      .should('have.value', '');

    /* cy.getByData('table-create-compensations-amount')
      .should('have.value', 0); */

    cy.getByData('table-create-compensations-remove-button')
      .should('exist');
  });

  it('SHOULD render add button WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .should('exist');
  });

  it('SHOULD render table total WHEN visit compensations page', () => {
    mountComponent();

    cy.getByData('table-create-compensations-total')
      .children()
      .should('have.length', 4);
  });

  it('SHOULD update compensation type WHEN call onSelect', () => {
    mountComponent();

    // english

    cy.getByData('table-create-compensations-select')
      .select('1');
    // english

    cy.getByData('table-create-compensations-select')
      .should('have.value', '1');
  });

  it('SHOULD update compensation comment WHEN enter text', () => {
    mountComponent();

    cy.getByData('table-create-compensations-comment')
      .type('test');

    cy.getByData('table-create-compensations-comment')
      .should('have.value', 'test');
  });

  it('SHOULD update compensation amount WHEN enter text', () => {
    mountComponent();

    cy.getByData('table-create-compensations-amount')
      .type('2');

    cy.getByData('table-create-compensations-amount')
      .should('have.value', 2);
  });

  it('SHOULD add new row WHEN click add button', () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-item')
      .should('have.length', 2);
  });

  it('SHOULD remove second compensation WHEN call delete', () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-remove-button')
      .last()
      .click();

    cy.getByData('table-create-compensations-item')
      .should('have.length', 1);
  });

  it('SHOULD calculate correct sum total WHEN enter amount', () => {
    mountComponent();

    cy.getByData('table-create-compensations-sum')
      .contains(0);

    cy.getByData('table-create-compensations-amount')
      .type('1000');

    cy.getByData('table-create-compensations-sum')
      .contains(1000);

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-amount')
      .last()
      .type('10');

    cy.getByData('table-create-compensations-sum')
      .contains(1010);
  });
});

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState();

  createCompensationsState.initializeTypes({
    loadedTypes: INITIAL_TYPES,
  });

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <TableCreateCompensations />
    </CreateCompensationsStateContext.Provider>,
  );
}
