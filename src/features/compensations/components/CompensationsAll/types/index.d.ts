type CompensationsAllItemType = {
  id?: number;
  employeeFullName: string;
  dateCompensation: string;
  dateCreateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
};

type CompensationsAllType = {
  list: CompensationsAllItemType[],
  totalAmount: number;
};
