import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { profileSidebarRoutes } from '../features/profile/routes';
import { SidebarRoutesProps } from '../types';
import {
  employeesSidebarRoutes,
} from '../features/employees/routes';
import {
  analyticsSidebarRoutes,
} from '../features/analytics/routes';
import { Permission } from './state/AccessBasedOnPemissionsState';
import {
  accountsSidebarRoutes,
  rolesSidebarRoutes,
  sidebarAccountManagement,
} from '../features/account-management/routers';
import { compensationsRoutes, compensationsSidebarRoutes } from '../features/compensations/routes';

export function getAdminRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[] = [];

  routes.push(...compensationsRoutes);

  // ToDo
  console.log('accessPermissions', accessPermissions);

  return routes;
}

export function getSidebarRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: SidebarRoutesProps[] = [];

  const copyAccountManagement = { ...sidebarAccountManagement };

  if (accessPermissions.get('ViewPersonalProfile')) {
    routes.push(...profileSidebarRoutes);
  }

  if (accessPermissions.get('AccessAnalyticalForecastsPage')) {
    routes.push(...analyticsSidebarRoutes);
  }

  if (accessPermissions.get('ViewContacts') || accessPermissions.get('ViewSalaryAndDocumentsData')) {
    routes.push(...employeesSidebarRoutes);
  }

  routes.push(...compensationsSidebarRoutes);

  if (accessPermissions.get('ViewAccounts') && accessPermissions.get('ViewRoles')) {
    copyAccountManagement.routes = [accountsSidebarRoutes, rolesSidebarRoutes];

    routes.push(copyAccountManagement);

    return routes;
  }

  if (accessPermissions.get('ViewAccounts')) {
    copyAccountManagement.routes = [accountsSidebarRoutes];

    routes.push(copyAccountManagement);
    return routes;
  }

  if (accessPermissions.get('ViewRoles')) {
    copyAccountManagement.routes = [rolesSidebarRoutes];

    routes.push(copyAccountManagement);

    return routes;
  }

  return routes;
}
