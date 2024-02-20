import { ReactComponent as IconEmployees } from '../../assets/icons/icon-employees.svg';
import { ReactComponent as IconEmployeesActive } from '../../assets/icons/icon-employees-active.svg';

export const employeesSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/employees',
    label: 'Employees',
    icon: <IconEmployees />,
    iconActive: <IconEmployeesActive />,
  },
];
