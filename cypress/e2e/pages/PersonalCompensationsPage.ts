export class PersonalCompensationsPage {
  static visit() {
    cy.visit('/compensations/my');
  }

  static checkStatus(comment: string, status: string) {
    cy
      .getByData('compensations-table')
      .contains(comment)
      .parent()
      .within(() => {
        cy
          .getByData('compensations-table-column-amount')
          .should('have.class', `compensations-table__column-amount--${status}`);
      });
  }
}
