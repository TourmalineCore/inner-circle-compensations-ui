type EmployeeAllCompensationsItemType = {
  id: number;
  compensationType: string;
  comment: string;
  amount: number;
  dateCreateCompensation: string;
};

type AllCompensationsItemType = {
  employeeId: number;
  employeeFullName: string;
  dateCompensation: string;
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
