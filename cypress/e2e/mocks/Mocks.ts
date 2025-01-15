import { INITIAL_TYPES } from '../../../src/features/compensations/components/CreateCompensations/types/InitialTypes';

// eslint-disable-next-line max-len
export const MOCK_TOCKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lSWRlbnRpZmllciI6Im1haWxAbWFpbC5ydSIsImNvcnBvcmF0ZUVtYWlsIjoibWFpbEBtYWlsLnJ1IiwidGVuYW50SWQiOiIxIiwiYWNjb3VudElkIjoiMyIsImVtcGxveWVlSWQiOiIyIiwicGVybWlzc2lvbnMiOlsiQ2FuUmVxdWVzdENvbXBlbnNhdGlvbnMiLCJDYW5NYW5hZ2VDb21wZW5zYXRpb25zIl0sImV4cCI6MTczNjg0NzM2N30.XlHInQI97cj0lsPCnCkE-rLU-LpsmKPPz2SqEuK6fh4';

export class Mocks {
  static mockAuth() {
    localStorage.setItem('accessToken', JSON.stringify({ value: MOCK_TOCKEN, expiresInUtc: '2025-01-14T09:36:07.384923Z' }));
  }

  static mockGetTypes() {
    cy.intercept('GET', `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/types`, {
      statusCode: 200,
      body: INITIAL_TYPES,
    }).as('getCompensationTypes');
  }

  static mockCreateCompensation() {
    cy.intercept('POST', `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/create`, {
      statusCode: 200,
      body: [8],
    }).as('createCompensation');
  }

  static mockGetAllCompensations_1() {
    cy.intercept('GET', `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/all`, {
      statusCode: 200,
      body: {
        list: [
          {
            id: 7,
            comment: '',
            amount: 3000,
            isPaid: true,
            compensationType: 'Psychotherapy',
            compensationRequestedAtUtc: '2024-01-30T11:50:36Z',
            compensationRequestedForYearAndMonth: '01/30/2024',
          },
        ],
      },
    }).as('getAllCompensations_1');
  }

  static mockGetAllCompensations_2(newComment: string, newRequestDate: string, newRequestYearAndMonth: string) {
    cy.intercept('GET', `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/all`, {
      statusCode: 200,
      body: {
        list: [
          {
            id: 7,
            comment: '',
            amount: 3000,
            isPaid: true,
            compensationType: 'Psychotherapy',
            compensationRequestedAtUtc: '2024-01-30T11:50:36Z',
            compensationRequestedForYearAndMonth: '01/30/2024',
          },
          {
            id: 8,
            comment: newComment,
            amount: 800,
            isPaid: false,
            compensationType: 'Coworking',
            compensationRequestedAtUtc: newRequestDate,
            compensationRequestedForYearAndMonth: newRequestYearAndMonth,
          },
        ],
      },
    }).as('getAllCompensations_2');
  }

  static mockGetAllCompensations_3(newComment: string, newRequestDate: string, newRequestYearAndMonth: string) {
    cy.intercept('GET', `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/all`, {
      statusCode: 200,
      body: {
        list: [
          {
            id: 7,
            comment: '',
            amount: 3000,
            isPaid: true,
            compensationType: 'Psychotherapy',
            compensationRequestedAtUtc: '2024-01-30T11:50:36Z',
            compensationRequestedForYearAndMonth: '01/30/2024',
          },
          {
            id: 8,
            comment: newComment,
            amount: 800,
            isPaid: true,
            compensationType: 'Coworking',
            compensationRequestedAtUtc: newRequestDate,
            compensationRequestedForYearAndMonth: newRequestYearAndMonth,
          },
        ],
      },
    }).as('getAllCompensations_3');
  }

  static mockGetAllEmployeesCompensations(newComment: string, newRequestDate: string, newRequestYearAndMonth: string) {
    cy.intercept('GET', `${Cypress.env('API_ROOT')}${Cypress.env('LINK_TO_COMPENSATIONS_SERVICE')}/admin/all?year=2025&month=1`, {
      totalAmount: 800,
      totalUnpaidAmount: 800,
      items: [
        {
          employeeFullName: 'Employee Name',
          employeeId: 2,
          compensationRequestedForYearAndMonth: newRequestYearAndMonth,
          totalAmount: 800,
          unpaidAmount: 800,
          isPaid: false,
          compensations: [
            {
              id: 8,
              compensationType: 'Coworking',
              comment: newComment,
              amount: 800,
              compensationRequestedAtUtc: newRequestDate,
            },
          ],
        },
      ],
    }).as('getAllEmployeesCompensations');
  }
}
