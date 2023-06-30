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
    return this._compensations;
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

export default CompensationsState;
