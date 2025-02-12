/* eslint-disable cypress/unsafe-to-chain-command */
import { formatMoney } from '../../../../../../common/utils/formatMoney'
import { CreateCompensationsState } from '../../state/CreateCompensationsState'
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext'
import { INITIAL_TYPES } from '../../types/InitialTypes'
import { TableCreateCompensations } from './TableCreateCompensations'

describe(`TableCreateCompensations`, () => {
  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render table create compensations component
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render table columns
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-head`)
      .children()
      .should(`have.length`, 6)
  })

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render empty compensation item on table
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-item`)
      .children()
      .should(`have.length`, 6)

    cy
      .getByData(`table-create-compensations-select`)
      .should(`have.value`, null)

    cy
      .getByData(`table-create-compensations-quantity`)
      .should(`have.value`, 1)

    cy
      .getByData(`table-create-compensations-amount`)
      .should(`have.value`, ``)

    cy
      .getByData(`table-create-compensations-comment`)
      .should(`have.value`, ``)

    cy
      .getByData(`table-create-compensations-total-amount`)
      .should(`have.value`, ``)

    cy
      .getByData(`table-create-compensations-remove-button`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render add button 
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-add-button`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations page 
  WHEN visit compensations page
  THEN render table total
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-total`)
      .children()
      .should(`have.length`, 6)
  })

  it(`
  GIVEN compensations page 
  WHEN call onSelect
  THEN update compensation type 
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-select`)
      .select(`5`)

    cy
      .getByData(`table-create-compensations-select`)
      .should(`have.value`, `5`)
  })

  it(`
  GIVEN compensations page 
  WHEN enter text
  THEN update compensation comment
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-comment`)
      .type(`test`)

    cy
      .getByData(`table-create-compensations-comment`)
      .should(`have.value`, `test`)
  })

  it(`
  GIVEN compensations page 
  WHEN enter text
  THEN update compensation amount
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-amount`)
      .type(`2`)

    cy
      .getByData(`table-create-compensations-amount`)
      .should(`have.value`, 2)
  })

  it(`
  GIVEN compensations page 
  WHEN click add button
  THEN add new row
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-add-button`)
      .click()

    cy
      .getByData(`table-create-compensations-item`)
      .should(`have.length`, 2)
  })

  it(`
  GIVEN compensations page 
  WHEN call delete
  THEN remove compensation
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-add-button`)
      .click()

    cy
      .getByData(`table-create-compensations-remove-button`)
      .last()
      .click()

    cy
      .getByData(`table-create-compensations-item`)
      .should(`have.length`, 1)
  })

  it(`
  GIVEN compensations page 
  WHEN enter amount
  THEN calculate correct sum total
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-sum`)
      .should(`have.text`, formatMoney(0))

    cy
      .getByData(`table-create-compensations-amount`)
      .type(`1000`)

    cy
      .getByData(`table-create-compensations-sum`)
      .should(`have.text`, formatMoney(1000))

    cy
      .getByData(`table-create-compensations-add-button`)
      .click()

    cy
      .getByData(`table-create-compensations-quantity`)
      .last()
      .clear()
      .type(`2`)

    cy
      .getByData(`table-create-compensations-amount`)
      .last()
      .type(`10`)

    cy
      .getByData(`table-create-compensations-sum`)
      .should(`have.text`, formatMoney(1020))

    cy
      .getByData(`table-create-compensations-quantity`)
      .last()
      .clear()
      .type(`1`)

    cy
      .getByData(`table-create-compensations-sum`)
      .should(`have.text`, formatMoney(1010))
  })

  it(`
  GIVEN compensations page 
  WHEN choose compensation type
  THEN see all types except English and German
  AND except Swimming, Water, Products, Consumables, Periphery
  AND including Sport and Office expenses
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-column-select`)
      .click()

    cy
      .getByData(`table-create-compensations-select-option`)
      .should(`have.length`, 8)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`English`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`German`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Massage`)
      .should(`exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Swimming`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Water`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Products`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Consumables`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Periphery`)
      .should(`not.exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Sport`)
      .should(`exist`)

    cy
      .getByData(`table-create-compensations-select-option`)
      .contains(`Office expenses`)
      .should(`exist`)
  })

  it(`
  GIVEN compensations page 
  WHEN enter text to quantity
  THEN update compensation quantity
  `, () => {
    mountComponent()

    // test onblur, when clear input by default must be 1
    cy
      .getByData(`table-create-compensations-quantity`)
      .clear()

    // simulate loss of focus
    cy
      .getByData(`table-create-compensations-comment`)
      .click()

    cy
      .getByData(`table-create-compensations-quantity`)
      .should(`have.value`, 1)

    cy
      .getByData(`table-create-compensations-quantity`)
      .clear()
      .type(`2`)

    // simulate loss of focus
    cy
      .getByData(`table-create-compensations-comment`)
      .click()

    cy
      .getByData(`table-create-compensations-quantity`)
      .should(`have.value`, 2)
  })

  it(`
  GIVEN compensations page 
  WHEN enter quantity and amount data
  THEN update compensation total amount
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-quantity`)
      .clear()
      .type(`2`)

    cy
      .getByData(`table-create-compensations-amount`)
      .type(`20`)

    cy
      .getByData(`table-create-compensations-total-amount`)
      .should(`have.text`, formatMoney(40))
  })

  it(`
  GIVEN compensations page 
  WHEN enter symbol to quantity input
  THEN return to default value
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-quantity`)
      .should(`have.value`, 1)

    cy
      .getByData(`table-create-compensations-quantity`)
      .clear()
      .type(`-`)

    // simulate loss of focus
    cy
      .getByData(`table-create-compensations-comment`)
      .click()

    cy
      .getByData(`table-create-compensations-quantity`)
      .should(`have.value`, 1)
  })

  it(`
  GIVEN compensations page 
  WHEN enter symbol to amount input
  THEN return to default value
  `, () => {
    mountComponent()

    cy
      .getByData(`table-create-compensations-amount`)
      .should(`have.text`, ``)

    cy
      .getByData(`table-create-compensations-amount`)
      .type(`-`)

    cy
      .getByData(`table-create-compensations-amount`)
      .should(`have.text`, ``)
  })
})

function mountComponent() {
  const createCompensationsState = new CreateCompensationsState()

  createCompensationsState.initializeTypes({
    loadedTypes: INITIAL_TYPES,
  })

  cy.mount(
    <CreateCompensationsStateContext.Provider value={createCompensationsState}>
      <TableCreateCompensations />
    </CreateCompensationsStateContext.Provider>,
  )
}
