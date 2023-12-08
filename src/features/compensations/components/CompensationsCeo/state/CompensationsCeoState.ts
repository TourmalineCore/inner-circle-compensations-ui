import { makeAutoObservable } from 'mobx';

class CompensationsCeoState {
  private _compensations: CompensationsCeoType = {
    list: [],
    totalAmount: 0,
  };

  private _filterTerm = 'unpaid';

  private _searchTerm = '';

  private _dateCompensation: Date | string = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  get allCompensations() {
    return {
      list: this._compensations.list.filter((item) => getFiltering(item, this._filterTerm)), // .filter((item) => getSearch(Number(item.employeeId), this._searchTerm)),
      totalAmount: this._compensations.totalAmount,
    };
  }

  get filterTerm() {
    return this._filterTerm;
  }

  get dateCompensation() {
    return this._dateCompensation;
  }

  initialize({
    loadedCompensations,
  }: {
    loadedCompensations: CompensationsCeoType,
  }) {
    this._compensations = loadedCompensations;
  }

  updateFilterTerm(newFilterTerm: string) {
    this._filterTerm = newFilterTerm;
  }

  updateSearchTerm(newSearchTerm: string) {
    this._searchTerm = newSearchTerm;
  }

  updateDate(newDate: Date | string) {
    this._dateCompensation = newDate;
  }
}

export function getFiltering(
  employee: CompensationsCeoItemType,
  filterTerm: string,
) {
  if (filterTerm === 'unpaid') {
    return !employee.isPaid;
  }

  return employee;
}

export function getSearch(searchElement: string, searchTerm: string) {
  return searchElement.toLowerCase().includes(searchTerm.toLowerCase().trim());
}

export default CompensationsCeoState;
