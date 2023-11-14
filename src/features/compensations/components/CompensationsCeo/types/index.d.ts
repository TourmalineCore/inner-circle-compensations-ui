type CompensationsCeoItemType = {
  id?: number;
  dateCreateCompensation: string;
  dateCompensation: string;
  comment: string;
  amount: number;
  isPaid: boolean;
  employeeId: number;
  fio: string;
};

type CompensationsCeoType = {
  list: CompensationsCeoItemType[],
  totalUnpaidAmount: number;
};
