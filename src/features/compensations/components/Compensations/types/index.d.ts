type CompensationsItemType = {
  id?: number;
  dateCreateCompensation: string;
  dateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
};

type CompensationsType = {
  list: CompensationsItemType[],
  totalUnpaidAmount: number;
};
