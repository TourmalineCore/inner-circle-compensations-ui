import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { profileSidebarRoutes } from '../pages/profile/routes'
import { SidebarRoutesProps } from '../types'
import { employeesSidebarRoutes } from '../pages/employees/routes'
import { Permission } from './state/AccessBasedOnPemissionsState'
import { accountsSidebarRoutes, rolesSidebarRoutes, sidebarAccountManagement, tenantsSidebarRoutes } from '../pages/account-management/routers'
import { compensationAllRoutes, compensationPersonalRoutes, allCompensationsAccessSidebarRoutes, getRouteForCompensations } from '../pages/compensations/routes'
import { documentsSidebarRoutes } from '../pages/documents/routes'

export function getAdminRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string,
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined),
    Component: () => JSX.Element,
  }[] = []

  if (accessPermissions.get(`CanRequestCompensations`)) {
    routes.push(...compensationPersonalRoutes)
  }

  if (accessPermissions.get(`CanManageCompensations`)) {
    routes.push(...compensationAllRoutes)
  }

  return routes
}

export function getSidebarRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: SidebarRoutesProps[] = []

  const copyAccountManagement = {
    ...sidebarAccountManagement,
  }

  if (accessPermissions.get(`ViewPersonalProfile`)) {
    routes.push(...profileSidebarRoutes)
  }

  if (accessPermissions.get(`ViewContacts`) || accessPermissions.get(`ViewSalaryAndDocumentsData`)) {
    routes.push(...employeesSidebarRoutes)
  }

  if (accessPermissions.get(`CanRequestCompensations`) && accessPermissions.get(`CanManageCompensations`)) {
    routes.push(...allCompensationsAccessSidebarRoutes)
  }

  if (accessPermissions.get(`CanRequestCompensations`) && !accessPermissions.get(`CanManageCompensations`)) {
    routes.push(...getRouteForCompensations(`CanRequestCompensations`))
  }

  if (accessPermissions.get(`CanManageCompensations`) && !accessPermissions.get(`CanRequestCompensations`)) {
    routes.push(...getRouteForCompensations(`CanManageCompensations`))
  }

  if (accessPermissions.get(`CanManageDocuments`)) {
    routes.push(...documentsSidebarRoutes)
  }

  if (accessPermissions.get(`ViewAccounts`) && accessPermissions.get(`ViewRoles`) && accessPermissions.get(`CanManageTenants`)) {
    copyAccountManagement.routes = [
      accountsSidebarRoutes,
      rolesSidebarRoutes,
      tenantsSidebarRoutes,
    ]

    routes.push(copyAccountManagement)

    return routes
  }

  if (accessPermissions.get(`ViewAccounts`)) {
    copyAccountManagement.routes = [
      accountsSidebarRoutes,
    ]

    routes.push(copyAccountManagement)
    return routes
  }

  if (accessPermissions.get(`ViewRoles`)) {
    copyAccountManagement.routes = [
      rolesSidebarRoutes,
    ]

    routes.push(copyAccountManagement)

    return routes
  }

  if (accessPermissions.get(`CanManageTenants`)) {
    copyAccountManagement.routes = [
      tenantsSidebarRoutes,
    ]

    routes.push(copyAccountManagement)

    return routes
  }

  return routes
}
