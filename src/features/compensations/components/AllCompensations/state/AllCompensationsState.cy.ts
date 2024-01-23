import '../../../../../../cypress/support/commands';
import { AllCompensationsState } from './AllCompensationsState';

const allCompensationsState = new AllCompensationsState();

allCompensationsState.initialize({
  loadedCompensations: {
    items: [
      {
        employeeFullName: 'Ceo Ceo Ceo',
        employeeId: 55,
        dateCompensation: '2023-12-01T05:00:00Z',
        totalAmount: 3520.45,
        unpaidAmount: 760,
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
    totalUnpaidAmount: 760,
  },
});

describe('AllCompensationsState', () => {
  it(`
  GIVEN compensations all page 
  WHEN initialized
  THEN return all compensations
  `, () => {
    expect(allCompensationsState.allCompensations.items).to.has.lengthOf(1);
    expect(allCompensationsState.allCompensations.totalAmount).eq(3520.45);
    expect(allCompensationsState.allCompensations.totalUnpaidAmount).eq(760);
  });

  it(`
  GIVEN compensations all page 
  WHEN called update filter
  THEN get value filter
  `, () => {
    allCompensationsState.updateFilterTerm('all');
    expect(allCompensationsState.filterTerm).eq('all');

    allCompensationsState.updateFilterTerm('unpaid');
    expect(allCompensationsState.filterTerm).eq('unpaid');
  });

  it(`
  GIVEN compensations all page 
  WHEN called change status
  THEN status changed
  `, () => {
    expect(allCompensationsState.isChange).eq(false);

    allCompensationsState.updateStatus(true);
    expect(allCompensationsState.isChange).eq(true);
  });

  it(`
  GIVEN compensations all page 
  WHEN called update date
  THEN get value filter
  `, () => {
    allCompensationsState.updateDate(new Date('2023-10-01T05:00:00Z'));
    expect(allCompensationsState.monthYearDate.month).eq(10);
    expect(allCompensationsState.monthYearDate.year).eq(2023);
  });
});
