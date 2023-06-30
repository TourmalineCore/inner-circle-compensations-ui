type CompensationsItemType = { date: string; comment: string; amount: number; isUnpaid: boolean };

type CompensationsType = {
  list: CompensationsItemType[],
  totalUnpaidAmount: number;
};
