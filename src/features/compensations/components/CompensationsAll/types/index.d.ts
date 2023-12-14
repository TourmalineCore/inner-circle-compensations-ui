type CompensationsAllItemType = {
  id: number;
  employeeFullName: string;
  dateCompensation: string;
  dateCreateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
  isSelected?: bollean;
};

type CompensationsAllType = {
  list: CompensationsAllItemType[],
  totalAmount: number;
};
