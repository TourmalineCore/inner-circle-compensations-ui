/* eslint-disable react/jsx-no-constructed-context-values */
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import { CreateCompensationsState } from '../../state/CreateCompensationsState';
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext';
import { TableCreateCompensations } from './TableCreateCompensations';

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
    label: 'Psychotherapy',
  },
  {
    typeId: 12,
    label: 'Medical consultation',
  },
  {
    typeId: 13,
    label: 'Other',
  },
];

describe('TableCreateCompensations', () => {
  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render table create compensations component
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render table columns
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-head')
      .children()
      .should('have.length', 4);
  });

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render empty compensation item on table
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-item')
      .children()
      .should('have.length', 4);

    cy.getByData('table-create-compensations-select')
      .should('have.value', null);

    cy.getByData('table-create-compensations-comment')
      .should('have.value', '');

    cy.getByData('table-create-compensations-amount')
      .should('have.value', '');

    cy.getByData('table-create-compensations-remove-button')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render add button 
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render table total
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-total')
      .children()
      .should('have.length', 4);
  });

  it(`
  GIVEN compensations page 
  WHEN call onSelect
  THEN update compensation type 
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-select')
      .select('1');

    cy.getByData('table-create-compensations-select')
      .should('have.value', '1');
  });

  it(`
  GIVEN compensations page 
  WHEN enter text
  THEN update compensation comment
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-comment')
      .type('test');

    cy.getByData('table-create-compensations-comment')
      .should('have.value', 'test');
  });

  it(`
  GIVEN compensations page 
  WHEN enter text
  THEN update compensation amount
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-amount')
      .type('2');

    cy.getByData('table-create-compensations-amount')
      .should('have.value', 2);
  });

  it(`
  GIVEN compensations page 
  WHEN click add button
  THEN add new row
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-item')
      .should('have.length', 2);
  });

  it(`
  GIVEN compensations page 
  WHEN call delete
  THEN remove compensation
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-remove-button')
      .last()
      .click();

    cy.getByData('table-create-compensations-item')
      .should('have.length', 1);
  });

  it.only(`
  GIVEN compensations page 
  WHEN enter amount
  THEN calculate correct sum total
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-sum')
      .should('have.text', formatMoney(0));

    cy.getByData('table-create-compensations-amount')
      .type('1000');

    cy.getByData('table-create-compensations-sum')
      .should('have.text', formatMoney(1000));

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-amount')
      .last()
      .type('10');

    cy.getByData('table-create-compensations-sum')
      .should('have.text', formatMoney(1010));
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
