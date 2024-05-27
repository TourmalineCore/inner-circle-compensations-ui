type CompensationsItemType = {
  id?: number;
  compensationRequestedAtUtc: string;
  compensationRequestedForYearAndMonth: string;
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
