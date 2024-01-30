import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';
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
  if (permission === 'ViewPersonalCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: '/compensations/my',
      label: 'Compensations',
      icon: <IconAnalytics />,
      iconActive: <IconAnalyticsActive />,
    }];
  }

  return [{
    isWindowRedirectNecessary: true,
    path: '/compensations/all',
    label: 'Compensations',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  }];
}

export const allCompensationsAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/compensations',
    label: 'Compensations',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/my',
        label: 'My',
        iconMini: <IconAnalytics />,
      },
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/all',
        label: 'All',
        iconMini: <IconAnalytics />,
      }],
  },
];
