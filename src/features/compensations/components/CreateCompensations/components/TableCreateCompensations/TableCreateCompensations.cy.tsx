/* eslint-disable react/jsx-no-constructed-context-values */
import CreateCompensationsState from '../../state/CreateCompensationsState';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';
import TableCreateCompensations from './TableCreateCompensations';

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

    cy.getByData('table-create-compensations-select')
      .select('english');

    cy.getByData('table-create-compensations-select')
      .should('have.value', 'english');
  });

  it('SHOULD update compensation comment WHEN enter text', () => {
    mountComponent();

    cy.getByData('table-create-compensations-comment')
      .type('test');

    cy.getByData('table-create-compensations-comment')
      .should('have.value', 'test');
  });

  // TODO Nastya fix
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
