# Inner-Circle-Compensations

## Getting Started

```
npm ci

npm start
```

## Component tests

To run component tests in console you need enter the command

```
npm run cy:component
```

To open cypress to run component tests you need enter the command

```
npm run cy:open
```

## E2E tests

For e2e tests you must to ask your colleagues for the `cypress.config.local.ts` file

#### smoke-with-mocks.cy.ts

To run this test you must to start app using 

```
npm run start:local
```

and run test in console

```
npm run cy:run:e2e
```

or open it in cypress
```
npm run cy:e2e
```
