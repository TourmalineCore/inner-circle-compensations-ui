type CompensationsCeoItemType = {
  id?: number;
  employeeFullName: string;
  dateCompensation: string;
  dateCreateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
};

type CompensationsCeoType = {
  list: CompensationsCeoItemType[],
  totalAmount: number;
};
