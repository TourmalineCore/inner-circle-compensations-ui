import '../../../../cypress/support/commands';

import CompensationsTable from './CompensationsTable';

type CompensationsType = {
  list: { date: string; comment: string; amount: number; isUnpaid: boolean }[],
};

describe('CompensationsTable', () => {
  it('SHOULD render roles table WHEN visit roles page', () => {
    mountComponent();

    cy.getByData('compensations-table')
      .should('exist');
  });

  it('SHOULD render compensations table row WHEN have data', () => {
    mountComponent({
      compensations: {
        list: [
          {
            date: '2023-06-08T11:42:04.467165Z',
            comment: 'I bought milk',
            amount: 760,
            isUnpaid: false,
          },
        ],
      },
    });

    cy.getByData('compensations-table-row')
      .should('exist');
  });
});

function mountComponent({
  compensations,
}: {
  compensations: CompensationsType;
}) {
  cy.mount(
    <CompensationsTable compensations={compensations} />,
  );
}
