import { INITIAL_TYPES } from '../types/InitialTypes'
import { CreateCompensationsState } from './CreateCompensationsState'

describe(`CreateCompensationsState`, () => {
  it(`
  GIVEN compensations page 
  WHEN initialized
  THEN return all types 
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.initializeTypes({
      loadedTypes: INITIAL_TYPES,
    })

    expect(createCompensationsState.allTypes).to.has.lengthOf(8)
  })

  it(`
  GIVEN compensations page 
  WHEN call update
  THEN return compensation date
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.updateDate(`2023-06-08T11:42:04.467165Z`)

    expect(createCompensationsState.compensationRequestedForYearAndMonth)
      .eq(`2023-06-08T11:42:04.467165Z`)
  })

  it(`
  GIVEN compensations page 
  WHEN add compensation
  THEN return compensation
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.addCompensation()

    expect(createCompensationsState.allCompensations).to.has.lengthOf(2)

    expect(createCompensationsState.allCompensations[0].typeId)
      .eq(0)

    expect(createCompensationsState.allCompensations[0].quantity)
      .eq(1)

    expect(createCompensationsState.allCompensations[0].amount)
      .eq(0)

    expect(createCompensationsState.allCompensations[0].comment)
      .eq(``)
  })

  it(`
  GIVEN compensations page 
  WHEN add compensation of this type
  THEN return compensation of correct type
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.addCompensation(1)

    expect(createCompensationsState.allCompensations).to.has.lengthOf(2)

    expect(createCompensationsState.allCompensations[1].typeId)
      .eq(1)

    expect(createCompensationsState.allCompensations[1].quantity)
      .eq(1)

    expect(createCompensationsState.allCompensations[1].amount)
      .eq(0)

    expect(createCompensationsState.allCompensations[1].comment)
      .eq(``)
  })

  it(`
  GIVEN compensations page 
  WHEN remove compensation
  THEN return compensation
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.addCompensation()
    expect(createCompensationsState.allCompensations).to.has.lengthOf(2)

    createCompensationsState.removeCompensation(1)
    expect(createCompensationsState.allCompensations).to.has.lengthOf(1)
  })

  it(`
  GIVEN compensations page 
  WHEN update the created compensation
  THEN return compensation with new data
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.addCompensation()

    createCompensationsState.updateCompensation(getCompensation())

    expect(createCompensationsState.allCompensations[1].typeId)
      .eq(1)

    expect(createCompensationsState.allCompensations[1].quantity)
      .eq(2)

    expect(createCompensationsState.allCompensations[1].amount)
      .eq(100)

    expect(createCompensationsState.allCompensations[1].comment)
      .eq(`Test comment`)
  })

  it(`
  GIVEN compensations page 
  WHEN update the created compensation
  THEN return compensation with new data
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.addCompensation()

    createCompensationsState.updateCompensation(getCompensation())

    expect(createCompensationsState.allCompensations[1].typeId)
      .eq(1)

    expect(createCompensationsState.allCompensations[1].quantity)
      .eq(2)

    expect(createCompensationsState.allCompensations[1].amount)
      .eq(100)

    expect(createCompensationsState.allCompensations[1].comment)
      .eq(`Test comment`)
  })

  it(`
  GIVEN compensations page 
  WHEN enter amount
  THEN return total sum 
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    createCompensationsState.addCompensation()

    createCompensationsState.updateCompensation(getCompensation())

    expect(createCompensationsState.allCompensations[1].typeId)
      .eq(1)

    expect(createCompensationsState.allCompensations[1].quantity)
      .eq(2)

    expect(createCompensationsState.allCompensations[1].amount)
      .eq(100)

    expect(createCompensationsState.allCompensations[1].comment)
      .eq(`Test comment`)

    expect(createCompensationsState.totalCount)
      .eq(200)
  })

  it(`
  GIVEN compensations page 
  WHEN change state
  THEN change isTriedToSubmit
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isTriedToSubmit)
      .eq(true)
  })

  it(`
  GIVEN compensations page 
  WHEN call removal
  THEN remove compensation from the list
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.allCompensations).to.has.lengthOf(1)

    createCompensationsState.addCompensation()
    createCompensationsState.addCompensation()

    expect(createCompensationsState.allCompensations).to.has.lengthOf(3)

    createCompensationsState.removeCompensationsFromList()

    expect(createCompensationsState.allCompensations).to.has.lengthOf(1)
  })

  it(`
  GIVEN compensations page 
  WHEN click send button with negative amount
  THEN render error message
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.addCompensation()

    createCompensationsState.updateCompensation(getCompensation({
      amount: -100,
    }))

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isNegative)
      .eq(true)
  })

  it(`
  GIVEN compensations page 
  WHEN click send button with not negative amount
  THEN not render error message
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.addCompensation()

    createCompensationsState.updateCompensation(getCompensation())

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isNegative)
      .eq(false)
  })

  it(`
  GIVEN compensations page 
  WHEN click send button with empty fields required
  THEN render error message
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.updateCompensation(getCompensation({
      id: 0,
      typeId: 0,
      amount: 0,
      quantity: 1,
    }))

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isFilled)
      .eq(true)
  })

  it(`
  GIVEN compensations page 
  WHEN click send button with empty amount field required
  THEN render error message
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.updateCompensation(getCompensation({
      id: 0,
      typeId: 2,
      amount: 0,
      quantity: 1,
    }))

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isFilled)
      .eq(true)
  })

  it(`
  GIVEN compensations page 
  WHEN click send button with empty type field required
  THEN render error message
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.updateCompensation(getCompensation({
      id: 0,
      typeId: 0,
      quantity: 1,
    }))

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isFilled)
      .eq(true)
  })

  it(`
  GIVEN compensations page 
  WHEN click send button with not empty fields required
  THEN not render error message
  `, () => {
    const createCompensationsState = new CreateCompensationsState()

    expect(createCompensationsState.isTriedToSubmit)
      .eq(false)

    createCompensationsState.updateCompensation(getCompensation({
      id: 0,
      typeId: 2,
      quantity: 1,
    }))

    createCompensationsState.setIsTriedToSubmit(true)

    expect(createCompensationsState.isFilled)
      .eq(false)
  })
})

function getCompensation({
  id = 1,
  typeId = 1,
  quantity = 2,
  amount = 100,
  comment = `Test comment`,
}: {
  id?: number,
  typeId?: number,
  quantity?: number,
  amount?: number,
  comment?: string,
} = {}) {
  return {
    id,
    typeId,
    quantity,
    amount,
    comment,
  }
}
