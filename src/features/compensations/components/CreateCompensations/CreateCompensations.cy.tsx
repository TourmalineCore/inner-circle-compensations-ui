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
});

function mountComponent() {
  cy.mount(
    <CreateCompensations />,
  );
}
