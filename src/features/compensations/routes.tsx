import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';
import CompensationsPersonalPage from './CompensationsPersonalPage';
import CompensationsAllPage from './CompensationsAllPage';
import CompensationsPage from './CompensationsPage';

export const compensationPersonalRoutes = [
  {
    path: '/personal',
    breadcrumb: 'Personal',
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
    Component: CompensationsAllPage,
  },
];

export function getRouteForCompensations(permission: string) {
  if (permission === 'ViewPersonalCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: '/compensations/personal',
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

export const compensationsAllAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/compensations',
    label: 'Compensations',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: '/compensations/personal',
        label: 'Personal',
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
