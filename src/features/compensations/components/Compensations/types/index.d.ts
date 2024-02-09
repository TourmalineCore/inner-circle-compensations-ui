type CompensationsItemType = {
  id?: number;
  dateCreateCompensation: string;
  dateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
  compensationType: string;
  employeeId: number;
};

type CompensationsType = {
  list: CompensationsItemType[],
  totalUnpaidAmount: number;
};
