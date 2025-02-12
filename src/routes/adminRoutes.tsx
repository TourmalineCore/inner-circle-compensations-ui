import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'
import { SidebarRoutesProps } from '../types'
// import {

import { Permission } from './state/AccessBasedOnPemissionsState'

import { allCompensationsAccessSidebarRoutes, compensationAllRoutes, compensationPersonalRoutes, getRouteForCompensations } from '../pages/compensations/routes'

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

  if (accessPermissions.get(`CanRequestCompensations`) && accessPermissions.get(`CanManageCompensations`)) {
    routes.push(...allCompensationsAccessSidebarRoutes)
  }

  if (accessPermissions.get(`CanRequestCompensations`) && !accessPermissions.get(`CanManageCompensations`)) {
    routes.push(...getRouteForCompensations(`CanRequestCompensations`))
  }

  if (accessPermissions.get(`CanManageCompensations`) && !accessPermissions.get(`CanRequestCompensations`)) {
    routes.push(...getRouteForCompensations(`CanManageCompensations`))
  }

  return routes
}
