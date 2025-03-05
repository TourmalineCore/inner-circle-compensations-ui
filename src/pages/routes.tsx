import { AllCompensationsPage } from "./AllCompensationsPage"
import { CompensationsPersonalPage } from "./CompensationsPersonalPage"

const DEFAULT_PATH = `/compensations`

export const compensationPersonalRoutes = [
  {
    path: `${DEFAULT_PATH}/my`,
    breadcrumb: `My Compensations`,
    Component: CompensationsPersonalPage,
  },
  // {
  //   path: `${DEFAULT_PATH}/`,
  //   breadcrumb: `Compensations`,
  //   Component: CompensationsPage,
  // },
]

export const compensationAllRoutes = [
  {
    path: `${DEFAULT_PATH}/all`,
    breadcrumb: `All Compensations`,
    Component: AllCompensationsPage,
  },
  // {
  //   path: `${DEFAULT_PATH}/`,
  //   breadcrumb: `Compensations`,
  //   Component: CompensationsPage,
  // },
]
