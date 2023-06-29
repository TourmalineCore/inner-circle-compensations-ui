import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';

import CompensationsPage from './CompensationsPage';

export const compensationsRoutes = [
  {
    path: '/',
    breadcrumb: 'Compensations',
    Component: CompensationsPage,
  },
];

export const compensationsSidebarRoutes = [
  {
    path: '/compensations',
    label: 'Compensations',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
];
