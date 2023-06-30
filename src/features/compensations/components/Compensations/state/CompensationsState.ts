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

  constructor() {
    makeAutoObservable(this);
  }

  get allCompensations() {
    return this._compensations;
  }

  initialize({
    loadedCompensations,
  }: {
    loadedCompensations: CompensationsType,
  }) {
    this._compensations = loadedCompensations;
  }
}

export default CompensationsState;
