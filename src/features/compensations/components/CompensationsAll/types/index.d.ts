type EmployeeCompensationsAllItemType = {
  id: number;
  compensationType: string;
  comment: string;
  amount: number;
  dateCreateCompensation: string;
};

type CompensationsAllItemType = {
  employeeId: number;
  employeeFullName: string;
  dateCompensation: string;
  totalAmount: number;
  compensations: EmployeeCompensationsAllItemType[];
  isSelected?: bollean;
  isPaid: boolean;
};

type CompensationsAllType = {
  items: CompensationsAllItemType[],
  totalAmount: number;
};
