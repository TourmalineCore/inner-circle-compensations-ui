type CompensationsItemType = {
  dateCreateCompensation: string;
  dateCompensation: string;
  comment: string;
  amount: number;
  isUnpaid: boolean;
};

type CompensationsType = {
  list: CompensationsItemType[],
  totalUnpaidAmount: number;
};
