import '../../../../../../cypress/support/commands';

import CompensationsAllState from './CompensationsAllState';

describe('CompensationsAllState', () => {
  it('SHOULD return all compensations WHEN initialized', () => {
    const compensationsAllState = new CompensationsAllState();

    compensationsAllState.initialize({
      loadedCompensations: {
        list: [
          {
            id: 1,
            employeeFullName: 'Ceo Ceo I',
            dateCompensation: '2023-06-08T11:42:04.467165Z',
            dateCreateCompensation: '2023-06-08T11:42:04.467165Z',
            comment: 'I bought milk',
            amount: 760,
            isPaid: false,
          },
        ],
        totalAmount: 760,
      },
    });

    expect(compensationsAllState.allCompensations.list).to.has.lengthOf(1);
    expect(compensationsAllState.allCompensations.totalAmount).eq(760);
  });

  it('SHOULD get value filter WHEN called update', () => {
    const compensationsAllState = new CompensationsAllState();

    compensationsAllState.updateFilterTerm('all');

    expect(compensationsAllState.filterTerm).eq('all');
  });
});
