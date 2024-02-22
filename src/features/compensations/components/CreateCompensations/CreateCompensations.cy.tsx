/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';
import { CreateCompensations } from './CreateCompensations';

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
    label: 'Other',
  },
];

describe('CreateCompensations', () => {
  it(`
  GIVEN compensations page 
  WHEN visit page
  THEN render date picker
  `, () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('date-picker-compensations')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN visit page
  THEN render create compensations table 
  `, () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('table-create-compensations')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN call submit
  THEN validate that all required fields are filled 
  `, () => {
    mountComponent();

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('table-create-compensations-column-amount')
      .should('have.class', 'table-create-compensations__column-amount--invalid');

    cy.getByData('table-create-compensations-column-select')
      .should('have.class', 'table-create-compensations__column-type--invalid');
  });

  it(`
  GIVEN compensations page 
  WHEN submit of the previous one was successful
  THEN not show validation on newly created compensation
  `, () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    ).as('call-1');

    mountComponent();

    cy.intercept(
      'POST',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}create`,
      {
        statusCode: 400,
      },
    ).as('call-2');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('table-create-compensations-column-amount')
      .should('have.class', 'table-create-compensations__column-amount--invalid');

    cy.getByData('table-create-compensations-column-select')
      .should('have.class', 'table-create-compensations__column-type--invalid');

    cy.getByData('table-create-compensations-amount')
      .type('800');

    // english
    cy.getByData('table-create-compensations-select')
      .select('1');

    cy.intercept(
      'POST',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}create`,
      {
        compensations: [
          {
            typeId: 1,
            comment: '',
            amount: 800,
          },
        ],
        date: '2023-06-01T00:00:00Z',
      },
    ).as('call-3');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-column-select')
      .should('not.have.class', 'table-create-compensations__column-type--invalid');
  });

  it(`
  GIVEN compensations page 
  WHEN click send button with empty inputs required
  THEN render error messages
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-select').eq(0);

    cy.getByData('table-create-compensations-amount')
      .type('0');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('create-compensations-container-error-message')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN click send button with not empty inputs required
  THEN not render error messages
  `, () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    ).as('call-9');

    mountComponent();

    cy.wait('@call-9');

    cy.getByData('table-create-compensations-select')
      .select('1');

    cy.getByData('table-create-compensations-amount')
      .type('200');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('create-compensations-container-error-message')
      .should('not.include.text', 'Please fill required field')
      .should('not.include.text', 'Amount can not be negative');
  });

  it(`
  GIVEN compensations page 
  WHEN click send button with negative amount required
  THEN render error messages
  `, () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    ).as('call-10');

    mountComponent();

    cy.wait('@call-10');

    cy.getByData('table-create-compensations-select')
      .select('2');

    cy.getByData('table-create-compensations-amount')
      .type('-2');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('create-compensations-container-error-message')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN click send button with negative amount and empty select
  THEN render error messages
  `, () => {
    mountComponent();

    cy.getByData('table-create-compensations-select').eq(0);

    cy.getByData('table-create-compensations-amount')
      .type('-2');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('create-compensations-container-error-message')
      .should('exist');
  });

  it(`
  GIVEN compensations page 
  WHEN click send button with not negative amount required
  THEN not render error messages
  `, () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    ).as('call-11');

    mountComponent();

    cy.wait('@call-11');

    cy.getByData('table-create-compensations-select')
      .select('2');

    cy.getByData('table-create-compensations-amount')
      .type('2');

    cy.getByData('create-compensations-container-submit')
      .click();

    cy.getByData('create-compensations-container-error-message')
      .should('not.include.text', 'Please fill required field')
      .should('not.include.text', 'Amount can not be negative');
  });
});

function mountComponent() {
  cy.mount(
    <CreateCompensations />,
  );
}
