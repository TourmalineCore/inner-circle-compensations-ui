import '../../../../../../cypress/support/commands';

import CompensationsCeoState from './CompensationsCeoState';

describe('CompensationsCeoState', () => {
  it('SHOULD return all compensations WHEN initialized', () => {
    const compensationsCeoState = new CompensationsCeoState();

    compensationsCeoState.initialize({
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

    expect(compensationsCeoState.allCompensations.list).to.has.lengthOf(1);
    expect(compensationsCeoState.allCompensations.totalAmount).eq(760);
  });

  it('SHOULD get value filter WHEN called update', () => {
    const compensationsCeoState = new CompensationsCeoState();

    compensationsCeoState.updateFilterTerm('all');

    expect(compensationsCeoState.filterTerm).eq('all');
  });
});
