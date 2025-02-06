import { CompensationsState } from './CompensationsState'

const compensationsState = new CompensationsState()

describe(`CompensationsState`, () => {
  it(`
  GIVEN compensations personal page 
  WHEN initialized
  THEN return all personal compensations
  `, () => {
    compensationsState.initialize({
      loadedCompensations: {
        list: [
          {
            compensationRequestedAtUtc: `2023-06-08T11:42:04.467165Z`,
            compensationRequestedForYearAndMonth: `2023-06-08T11:42:04.467165Z`,
            comment: `I bought milk`,
            amount: 760,
            quantity: 2,
            isPaid: false,
            compensationType: `Massage`,
            employeeId: 1,
          },
        ],
        totalUnpaidAmount: 760,
      },
    })

    expect(compensationsState.allCompensations.list).to.has.lengthOf(1)

    expect(compensationsState.allCompensations.totalUnpaidAmount)
      .eq(760)
  })

  it(`
  GIVEN compensations personal page 
  WHEN called update filter
  THEN get value filter
  `, () => {
    compensationsState.updateFilterTerm(`all`)
    expect(compensationsState.filterTerm)
      .eq(`all`)

    compensationsState.updateFilterTerm(`unpaid`)
    expect(compensationsState.filterTerm)
      .eq(`unpaid`)
  })
})
