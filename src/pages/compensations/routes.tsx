import IconCompensations from '../../assets/icons/icon-compensations.svg?react'
import IconCompensationsActive from '../../assets/icons/icon-compensations-active.svg?react'
import { AllCompensationsPage } from './AllCompensationsPage'
import { CompensationsPersonalPage } from './CompensationsPersonalPage'
import { CompensationsPage } from './CompensationsPage'

const DEFAULT_PATH = `/compensations`

export const compensationPersonalRoutes = [
  {
    path: `${DEFAULT_PATH}/my`,
    breadcrumb: `My Compensations`,
    Component: CompensationsPersonalPage,
  },
  {
    path: `${DEFAULT_PATH}/`,
    breadcrumb: `Compensations`,
    Component: CompensationsPage,
  },
]

export const compensationAllRoutes = [
  {
    path: `${DEFAULT_PATH}/all`,
    breadcrumb: `All Compensations`,
    Component: AllCompensationsPage,
  },
  {
    path: `${DEFAULT_PATH}/`,
    breadcrumb: `Compensations`,
    Component: CompensationsPage,
  },
]

export function getRouteForCompensations(permission: string) {
  if (permission === `CanRequestCompensations`) {
    return [
      {
        isWindowRedirectNecessary: true,
        path: `${DEFAULT_PATH}/my`,
        label: `Compensations`,
        icon: <IconCompensations />,
        iconActive: <IconCompensationsActive />,
      },
    ]
  }

  return [
    {
      isWindowRedirectNecessary: true,
      path: `${DEFAULT_PATH}/all`,
      label: `Compensations`,
      icon: <IconCompensations />,
      iconActive: <IconCompensationsActive />,
    },
  ]
}

export const allCompensationsAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${DEFAULT_PATH}`,
    label: `Compensations`,
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: `${DEFAULT_PATH}/my`,
        label: `My`,
        iconMini: <IconCompensations />,
      },
      {
        isWindowRedirectNecessary: true,
        path: `${DEFAULT_PATH}/all`,
        label: `All`,
        iconMini: <IconCompensations />,
      },
    ],
  },
]
