/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { API_ROOT, LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import CreateCompensations from './CreateCompensations';

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

describe('TableCreateCompensations', () => {
  it('SHOULD render compensation types WHEN visit page', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('list-types-compensations')
      .children()
      .should('have.length', 12);
  });

  it('SHOULD render date picker WHEN visit page', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('date-picker-compensations')
      .should('exist');
  });

  it('SHOULD render create compensations table WHEN visit page', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/types`,
      INITIAL_TYPES,
    );

    mountComponent();

    cy.getByData('table-create-compensations')
      .should('exist');
  });

  it('SHOULD validate that all required fields are filled WHEN call submit', () => {
    mountComponent();

    cy.getByData('create-compensations-submit')
      .click();

    cy.getByData('table-create-compensations-td-amount')
      .should('have.class', 'table-create-compensations__column-amount--invalid');

    cy.getByData('table-create-compensations-td-select')
      .should('have.class', 'table-create-compensations__column-type--invalid');
  });

  it('SHOULD not show validation on newly created compensation WHEN submit of the previous one was successful', () => {
    cy.intercept(
      'GET',
      `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/types`,
      INITIAL_TYPES,
    ).as('call-1');

    mountComponent();

    cy.intercept(
      'POST',
      `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/create`,
      {
        statusCode: 400,
      },
    ).as('call-2');

    cy.getByData('create-compensations-submit')
      .click();

    cy.getByData('table-create-compensations-td-amount')
      .should('have.class', 'table-create-compensations__column-amount--invalid');

    cy.getByData('table-create-compensations-td-select')
      .should('have.class', 'table-create-compensations__column-type--invalid');

    cy.getByData('table-create-compensations-amount')
      .type('800');

    // english
    cy.getByData('table-create-compensations-select')
      .select('1');

    cy.intercept(
      'POST',
      `${API_ROOT}${LINK_TO_SALARY_SERVICE}/compensations/create`,
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

    cy.getByData('create-compensations-submit')
      .click();

    cy.getByData('table-create-compensations-add-button')
      .click();

    cy.getByData('table-create-compensations-td-select')
      .should('not.have.class', 'table-create-compensations__column-type--invalid');
  });

  it.skip('SHOULD render error messages WHEN click send button with empty inputs required', () => {
    mountComponent();

    cy.getByData('table-create-compensations-select')
      .select('0');

    cy.getByData('table-create-compensations-amount')
      .type('0');

    cy.getByData('create-compensations-submit')
      .click();

    cy.contains('Please fill required field. ').should('exist');
  });

  it.skip('SHOULD not render error messages WHEN click send button with not empty inputs required', () => {
    mountComponent();

    cy.getByData('table-create-compensations-select')
      .select('2');

    cy.getByData('table-create-compensations-amount')
      .type('200');

    cy.getByData('create-compensations-submit')
      .click();

    cy.contains('Please fill required field. ').should('not.exist');
  });

  it('SHOULD render error messages WHEN click send button with negative amount required', () => {
    mountComponent();

    cy.getByData('table-create-compensations-amount')
      .type('-2');

    cy.getByData('create-compensations-submit')
      .click();

    cy.contains('Amount can not be zero or negative' || 'Please fill required field. Amount can not be zero or negative').should('exist');
  });

  it('SHOULD not render error messages WHEN click send button with not negative amount required', () => {
    mountComponent();

    cy.getByData('table-create-compensations-amount')
      .type('2');

    cy.getByData('create-compensations-submit')
      .click();

    cy.contains('Amount can not be zero or negative' || 'Please fill required field. Amount can not be zero or negative').should('not.exist');
  });
});

function mountComponent() {
  cy.mount(
    <CreateCompensations />,
  );
}
