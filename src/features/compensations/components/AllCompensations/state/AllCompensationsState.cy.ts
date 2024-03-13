import '../../../../../../cypress/support/commands';
import { AllCompensationsState, getSelectedDate } from './AllCompensationsState';

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
  GIVEN all compensations page 
  WHEN initialized
  THEN return all compensations
  `, () => {
    expect(allCompensationsState.allCompensations.items).to.has.lengthOf(1);
    expect(allCompensationsState.allCompensations.totalAmount).eq(3520.45);
    expect(allCompensationsState.allCompensations.totalUnpaidAmount).eq(760);
  });

  it(`
  GIVEN all compensations page 
  WHEN called update filter
  THEN get value filter
  `, () => {
    allCompensationsState.updateFilterTerm('all');
    expect(allCompensationsState.filterTerm).eq('all');

    allCompensationsState.updateFilterTerm('unpaid');
    expect(allCompensationsState.filterTerm).eq('unpaid');
  });

  it(`
  GIVEN all compensations page 
  WHEN called change status
  THEN status changed
  `, () => {
    expect(allCompensationsState.isChange).eq(false);

    allCompensationsState.updateStatus(true);
    expect(allCompensationsState.isChange).eq(true);
  });

  it(`
  GIVEN all compensations page 
  WHEN called update date
  THEN get value filter
  `, () => {
    allCompensationsState.updateDate(new Date('2023-10-01T05:00:00Z'));
    expect(allCompensationsState.monthYearDate.month).eq(10);
    expect(allCompensationsState.monthYearDate.year).eq(2023);
  });

  it(`
  GIVEN all compensations page 
  WHEN visit compensations page 
  THEN render previous month if today date < 15
  `, () => {
    allCompensationsState.updateDate(getSelectedDate(new Date('2023-08-10')));
    expect(allCompensationsState.monthYearDate.month).eq(7);
    expect(allCompensationsState.monthYearDate.year).eq(2023);
  });

  it(`
  GIVEN all compensations page 
  WHEN visit compensations page 
  THEN render current month if today date > 15
  `, () => {
    allCompensationsState.updateDate(getSelectedDate(new Date('2023-08-20')));
    expect(allCompensationsState.monthYearDate.month).eq(8);
    expect(allCompensationsState.monthYearDate.year).eq(2023);
  });

  it(`
  GIVEN all compensations page 
  WHEN visit compensations page 
  THEN render previous month and year if today date < 15
  `, () => {
    allCompensationsState.updateDate(getSelectedDate(new Date('2024-01-10')));
    expect(allCompensationsState.monthYearDate.month).eq(12);
    expect(allCompensationsState.monthYearDate.year).eq(2023);
  });
});
