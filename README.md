# Inner-Circle-Compensations

## Getting Started

```
npm ci

npm start
```

## Component tests

To run component tests in console you need enter the command

```
npm run cy:run:component
```

To open cypress to run component tests you need enter the command

```
npm run cy:open:component
```

## E2E tests

For e2e tests you must to ask your colleagues for the `cypress.config.prod.ts` file if it needs

to open cypress use this command

```
npm run cy:open:e2e
```

to run it in console

```
npm run cy:run:e2e
```

to run test in local-env you need `cypress.config.local-env.ts` file and use command

```
npm run cy:run:e2e:local-env
```
