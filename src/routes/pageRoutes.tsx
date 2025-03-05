import { compensationAllRoutes, compensationPersonalRoutes } from '../pages/routes'
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs'

export function getPageRoutes(accessPermissions: Map<any, boolean>) {
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
