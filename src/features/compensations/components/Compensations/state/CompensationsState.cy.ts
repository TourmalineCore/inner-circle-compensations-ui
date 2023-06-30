import '../../../../../../cypress/support/commands';

import CompensationsState from './CompensationsState';

describe('CompensationsState', () => {
  it('SHOULD return all compensations WHEN initialized', () => {
    const compensationsState = new CompensationsState();

    compensationsState.initialize({
      loadedCompensations: {
        list: [
          {
            date: '2023-06-08T11:42:04.467165Z',
            comment: 'I bought milk',
            amount: 760,
            isUnpaid: false,
          },
        ],
        totalUnpaidAmount: 760,
      },
    });

    expect(compensationsState.allCompensations.list).to.has.lengthOf(1);
    expect(compensationsState.allCompensations.totalUnpaidAmount).eq(760);
  });

  it('SHOULD get value filter WHEN called update', () => {
    const compensationsState = new CompensationsState();

    compensationsState.updateFilterTerm('all');

    expect(compensationsState.filterTerm).eq('all');
  });
});
