import '../../../../../../cypress/support/commands';

import CompensationsAllState from './CompensationsAllState';

describe('CompensationsAllState', () => {
  it('SHOULD return all compensations WHEN initialized', () => {
    const compensationsAllState = new CompensationsAllState();

    compensationsAllState.initialize({
      loadedCompensations: {
        items: [
          {
            employeeFullName: 'Ceo Ceo Ceo',
            employeeId: 55,
            dateCompensation: '2023-12-01T05:00:00Z',
            totalAmount: 3520.45,
            isPaid: false,
            compensations: [
              {
                id: 55,
                compensationType: 'English',
                comment: 'I bought milk',
                amount: 760,
                dateCreateCompensation: '2023-12-19T06:56:49Z',
              },
              {
                id: 56,
                compensationType: 'German',
                comment: 'I bought this',
                amount: 2760.45,
                dateCreateCompensation: '2023-12-19T06:56:49Z',
              },
            ],
          },
        ],
        totalAmount: 3520.45,
      },
    });

    expect(compensationsAllState.allCompensations.items).to.has.lengthOf(1);
    expect(compensationsAllState.allCompensations.totalAmount).eq(3520.45);
  });

  it('SHOULD get value filter WHEN called update', () => {
    const compensationsAllState = new CompensationsAllState();

    compensationsAllState.updateFilterTerm('all');

    expect(compensationsAllState.filterTerm).eq('all');
  });
});
