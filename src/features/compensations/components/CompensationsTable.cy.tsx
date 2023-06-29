import '../../../../cypress/support/commands';

import CompensationsTable from './CompensationsTable';

type CompensationsType = {
  list: { date: string; comment: string; amount: number; isUnpaid: boolean }[],
  totalUnpaidAmount: number;
};

const mockData = {
  list: [
    {
      date: '2023-06-08T11:42:04.467165Z',
      comment: 'I bought milk',
      amount: 760,
      isUnpaid: false,
    },
  ],
  totalUnpaidAmount: 760,
};

describe('CompensationsTable', () => {
  it('SHOULD render compensations table WHEN visit compensations page', () => {
    mountComponent({
      compensations: mockData,
    });

    cy.getByData('compensations-table')
      .should('exist');
  });

  it('SHOULD render compensations table row WHEN have data', () => {
    mountComponent({
      compensations: mockData,
    });

    cy.getByData('compensations-table-row')
      .should('exist');
  });

  it('SHOULD render compensations table row total WHEN have data', () => {
    mountComponent({
      compensations: mockData,
    });

    cy.getByData('compensations-table-row-total')
      .should('exist');
  });

  it('SHOULD render compensations table with not message WHEN not have data', () => {
    mountComponent({
      compensations: {
        list: [],
        totalUnpaidAmount: 0,
      },
    });

    cy.getByData('compensations-table-no-data')
      .should('exist');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: CompensationsType;
}) {
  cy.mount(
    <CompensationsTable
      compensations={compensations}
    />,
  );
}
