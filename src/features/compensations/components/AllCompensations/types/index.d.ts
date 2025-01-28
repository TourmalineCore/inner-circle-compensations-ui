type EmployeeAllCompensationsItemType = {
  id: number;
  compensationType: string;
  quantity: number,
  comment: string;
  amount: number;
  compensationRequestedAtUtc: string;
};

type AllCompensationsItemType = {
  employeeId: number;
  employeeFullName: string;
  compensationRequestedForYearAndMonth: string;
  totalAmount: number;
  unpaidAmount: number;
  compensations: EmployeeAllCompensationsItemType[];
  isSelected?: bollean;
  isPaid: boolean;
};

type AllCompensationsType = {
  items: AllCompensationsItemType[],
  totalAmount: number;
  totalUnpaidAmount: number;
};
