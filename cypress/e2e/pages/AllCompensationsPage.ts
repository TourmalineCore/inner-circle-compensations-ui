export class AllCompensationsPage {
  static visit() {
    cy.visit(`/compensations/all`)
  }

  static findCompensation(comment: string) {
    cy
      .get(`body`)
      .then(($body) => {
        if ($body.find(`:contains("${comment}")`).length > 0) {
          cy
            .contains(comment)
            .click()
        }
        else {
          cy
            .getByData(`date-picker-all-compensations-select`)
            .click()

          cy
            .get(`body`)
            .then(($body) => {
              if ($body.find(`.react-datepicker__month-text--today`).length > 0) {
                cy
                  .get(`.react-datepicker__month-text--today`)
                  .click()
              }
              else {
                cy
                  .get(`.react-datepicker__navigation--next`)
                  .click()

                cy
                  .get(`.react-datepicker__month-text--today`)
                  .click()
              }
            })
        }
      })
  }
}
