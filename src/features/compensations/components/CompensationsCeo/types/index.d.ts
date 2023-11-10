type CompensationsCeoItemType = {
  id?: number;
  dateCreateCompensation: string;
  dateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
  employeeId: number;
};

type CompensationsCeoType = {
  list: CompensationsItemType[],
  totalUnpaidAmount: number;
};
