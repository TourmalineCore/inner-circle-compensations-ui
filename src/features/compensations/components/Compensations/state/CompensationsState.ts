import { makeAutoObservable } from 'mobx';

class CompensationsState {
  private _compensations: CompensationsType = {
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
  compensation: CompensationsItemType,
  filterTerm: string,
) {
  if (filterTerm === 'unpaid') {
    return !compensation.isPaid;
  }

  return compensation;
}

export default CompensationsState;
