/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config';
import CreateCompensations from './CreateCompensations';

const INITIAL_TYPES = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Milk',
    value: 'milk',
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
];

describe('TableCreateCompensations', () => {
  it('SHOULD render compensation types WHEN visit page', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('list-types-compensations')
      .children()
      .should('have.length', 11);
  });

  it('SHOULD render date picker WHEN visit page', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('date-picker-compensations')
      .should('exist');
  });

  it('SHOULD render create compensations table WHEN visit page', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData(' table-create-compensations')
      .should('exist');
  });

  it('SHOULD validate that all required fields are filled WHEN call submit', () => {
    mountComponent();

    cy.getByData('create-compensations-submit')
      .click();

    cy.getByData('table-create-compensations-amount')
      .should('have.class', 'input--invalid');

    cy.getByData('table-create-compensations-select')
      .should('have.class', 'select--invalid');
  });

  it('SHOULD not show validation on newly created compensation WHEN submit of the previous one was successful', () => {
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

    cy.getByData('create-compensations-submit')
      .click();

    cy.getByData('table-create-compensations-amount')
      .should('have.class', 'input--invalid');

    cy.getByData('table-create-compensations-select')
      .should('have.class', 'select--invalid');

    cy.getByData('table-create-compensations-amount')
      .type('800');

    cy.getByData('table-create-compensations-select')
      .select('english');

    cy.intercept(
      'POST',
      `${API_ROOT}${LINK_TO_COMPENSATIONS_SERVICE}create`,
      {
        compensations: [
          {
            type: 'English',
            comment: '',
            amount: 800,
          },
        ],
        date: '2023-06-01T00:00:00Z',
      },
    ).as('call-3');

    cy.getByData('create-compensations-submit')
      .click();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-select')
      .should('not.have.class', 'select--invalid');
  });
});

function mountComponent() {
  cy.mount(
    <CreateCompensations />,
  );
}
