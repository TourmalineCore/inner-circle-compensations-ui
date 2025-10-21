import { AllCompensationsPage } from "./all-compensations/AllCompensationsPage"
import { CompensationsPage } from "./compensations/CompensationsPage"

const DEFAULT_PATH = `/compensations`

export const compensationRoutes = [
  {
    path: `${DEFAULT_PATH}/my`,
    breadcrumb: `My Compensations`,
    Component: CompensationsPage,
  },
]

export const compensationAllRoutes = [
  {
    path: `${DEFAULT_PATH}/all`,
    breadcrumb: `All Compensations`,
    Component: AllCompensationsPage,
  },
]
