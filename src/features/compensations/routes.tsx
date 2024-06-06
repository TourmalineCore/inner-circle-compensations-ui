import { ReactComponent as IconCompensations } from '../../assets/icons/icon-compensations.svg';
import { ReactComponent as IconCompensationsActive } from '../../assets/icons/icon-compensations-active.svg';
import { AllCompensationsPage } from './AllCompensationsPage';
import { CompensationsPersonalPage } from './CompensationsPersonalPage';
import { CompensationsPage } from './CompensationsPage';

export const compensationPersonalRoutes = [
  {
    path: '/my',
    breadcrumb: 'My',
    Component: CompensationsPersonalPage,
  },
  {
    path: '/',
    breadcrumb: 'Compensations',
    Component: CompensationsPage,
  },
];

export const compensationAllRoutes = [
  {
    path: '/all',
    breadcrumb: 'All',
    Component: AllCompensationsPage,
  },
  {
    path: '/',
    breadcrumb: 'Compensations',
    Component: CompensationsPage,
  },
];

export function getRouteForCompensations(permission: string) {
  if (permission === 'CanRequestCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: '/compensations/my',
      label: 'Compensations',
      icon: <IconCompensations />,
      iconActive: <IconCompensationsActive />,
    }];
  }

  return [{
    isWindowRedirectNecessary: true,
    path: '/compensations/all',
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
  }];
}

export const allCompensationsAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/compensations',
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/my',
        label: 'My',
        iconMini: <IconCompensations />,
      },
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/all',
        label: 'All',
        iconMini: <IconCompensations />,
      }],
  },
];
