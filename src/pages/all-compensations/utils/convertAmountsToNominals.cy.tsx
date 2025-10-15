import { convertAmountsToNominals } from "./convertAmountsToNominals"

describe(`calculateTwoMaxes`, () => {
  it(`
    GIVEN no compensations requested
    WHEN ask for nominals
    SHOULD return 0 and no nominals
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [],
    })

    expect(result).to.deep.eq({
      totalAmount: 0,
      nominals: [],
    })
  })

  it(`
    GIVEN single employee that needs compensations
    WHEN asks for exactly 5000
    SHOULD return 5000 * 1
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [
        5000,
      ],
    })

    expect(result.totalAmount).to.eq(5000)
    expect(result.nominals.length).to.eq(1)
    expect(result.nominals[0]).to.deep.eq({
      nominal: 5000,
      count: 1,
    })
  })

  it(`
    GIVEN single employee that needs compensations
    WHEN asks for exactly 5100
    SHOULD return 5000 * 1, 100 * 1
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [
        5100,
      ],
    })

    expect(result.totalAmount).to.eq(5100)
    expect(result.nominals.length).to.eq(2)
    expect(result.nominals[0]).to.deep.eq({
      nominal: 5000,
      count: 1,
    })
    expect(result.nominals[1]).to.deep.eq({
      nominal: 100,
      count: 1,
    })
  })

  it(`
    GIVEN single employee that needs compensations
    WHEN asks for 1
    SHOULD round to 100 * 1
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [
        1,
      ],
    })

    expect(result.nominals).to.deep.eq([
      {
        nominal: 100,
        count: 1,
      },
    ])
  })

  it(`
    GIVEN three employees that need compensations
    WHEN first one asks 4049, second one asks for 9450, third one asks for 9951
    SHOULD TODO
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [
        4049, // 4100
        9450, // 9500
        9951, // 10000
      ],
    })

    expect(result.nominals).to.deep.eq([
      {
        nominal: 5000,
        count: 3,
      },
      {
        nominal: 1000,
        count: 8,
      },
      {
        nominal: 500,
        count: 1,
      },
      {
        nominal: 100,
        count: 1,
      },
    ])
  })

  it(`
    GIVEN two employees that need compensations
    WHEN first one asks for 1 and second one asks for 99
    SHOULD round to 100 * 2
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [
        1,
        99,
      ],
    })

    expect(result.nominals).to.deep.eq([
      {
        nominal: 100,
        count: 2,
      },
    ])
  })

  it(`
    GIVEN single employee that needs compensations
    WHEN asks for exactly 16800
    SHOULD return 5000 * 3, 1000 * 1, 500 * 1, 100 * 3
    `, () => {
    const result = convertAmountsToNominals({
      amounts: [
        16800,
      ],
    })

    expect(result.nominals).to.deep.eq([
      {
        nominal: 5000,
        count: 3,
      },
      {
        nominal: 1000,
        count: 1,
      },
      {
        nominal: 500,
        count: 1,
      },
      {
        nominal: 100,
        count: 3,
      },
    ])
  })
})
