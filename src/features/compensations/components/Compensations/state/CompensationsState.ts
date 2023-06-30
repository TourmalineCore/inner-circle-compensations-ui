import { makeAutoObservable } from 'mobx';

type CompensationsType = {
  list: { date: string; comment: string; amount: number; isUnpaid: boolean }[],
  totalUnpaidAmount: number;
};

class CompensationsState {
  private _compensations:CompensationsType = {
    list: [],
    totalUnpaidAmount: 0,
  };

  private _filterTerm = 'unpaid';

  constructor() {
    makeAutoObservable(this);
  }

  get allCompensations() {
    return {
      list: this._compensations.list.filter((item) => getFiltering(item, this._filterTerm)),
      totalUnpaidAmount: this._compensations.totalUnpaidAmount,
    };
  }

  get filterTerm() {
    return this._filterTerm;
  }

  initialize({
    loadedCompensations,
  }: {
    loadedCompensations: CompensationsType,
  }) {
    this._compensations = loadedCompensations;
  }

  updateFilterTerm(newFilterTerm: string) {
    this._filterTerm = newFilterTerm;
  }
}

export function getFiltering(
  employee: {
    date: string;
    comment: string;
    amount: number;
    isUnpaid: boolean
  },
  filterTerm: string,
) {
  if (filterTerm === 'unpaid') {
    return !employee.isUnpaid;
  }

  return employee;
}

export default CompensationsState;
