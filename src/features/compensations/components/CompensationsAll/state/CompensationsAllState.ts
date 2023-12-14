import { makeAutoObservable } from 'mobx';

class CompensationsAllState {
  private _compensations: CompensationsAllType = {
    list: [],
    totalAmount: 0,
  };

  private _filterTerm = 'unpaid';

  private _searchTerm = '';

  _isChange = false;

  _dateCompensation: Date | string = new Date();

  get allSelectedCompensations() {
    return this._compensations.list.filter((compensation) => compensation.isSelected);
  }

  constructor() {
    makeAutoObservable(this);
  }

  get allCompensations() {
    return {
      list: this._compensations.list.filter((item) => getFiltering(item, this._filterTerm)),
      totalAmount: this._compensations.totalAmount,
    };
  }

  get isSelected() {
    return this._compensations.list.some((item) => item.isSelected === true);
  }

  get totalCount() {
    return this._compensations.totalAmount;
  }

  get filterTerm() {
    return this._filterTerm;
  }

  get dateCompensation() {
    return this._dateCompensation;
  }

  setIsSelected(isSelected: boolean, id: number) {
    this._compensations.list.map((item) => {
      if (item.id === id) {
        return item.isSelected = isSelected;
      }
      return item;
    });
  }

  initialize({
    loadedCompensations,
  }: {
    loadedCompensations: CompensationsAllType,
  }) {
    this._compensations = {
      list: [],
      totalAmount: 0,
    };
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
  compensations: CompensationsAllItemType,
  filterTerm: string,
) {
  if (filterTerm === 'unpaid') {
    return !compensations.isPaid;
  }

  return compensations;
}

export function getSearch(searchElement: string, searchTerm: string) {
  return searchElement.toLowerCase().includes(searchTerm.toLowerCase().trim());
}

export default CompensationsAllState;
