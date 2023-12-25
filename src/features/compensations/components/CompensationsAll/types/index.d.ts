type EmployeeCompensationsAllItemType = {
  id: number;
  // employeeFullName: string;
  // dateCompensation: string;
  compensationType: string;
  comment: string;
  amount: number;
  dateCreateCompensation: string;
  // isPaid: boolean;
  // isSelected?: bollean;
};

type CompensationsAllItemType = {
  itemId: number;
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
