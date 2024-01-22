import { makeAutoObservable } from 'mobx';

export class AllCompensationsState {
  private _compensations: AllCompensationsType = {
    items: [{
      employeeId: 0,
      employeeFullName: 'string',
      dateCompensation: 'string',
      totalAmount: 100,
      compensations: [],
      isPaid: false,
    }],
    totalAmount: 0,
  };

  private _compensationsItem: AllCompensationsItemType = {
    employeeId: 0,
    employeeFullName: 'string',
    dateCompensation: 'string',
    totalAmount: 100,
    compensations: [],
    isPaid: false,
  };

  private _filterTerm = 'unpaid';

  private _searchTerm = '';

  private _isChange = false;

  private _dateCompensation: Date | string = new Date();

  get allSelectedCompensations() {
    return this._compensations.items.filter((compensation) => compensation.isSelected);
  }

  constructor() {
    makeAutoObservable(this);
  }

  get allCompensations() {
    return {
      items: this._compensations.items.filter((item) => getFiltering(item, this._filterTerm)),
      totalAmount: this._compensations.totalAmount,
    };
  }

  getCompensationIds() {
    return this._compensationsItem.compensations.map((compensation) => compensation.id);
  }

  get isSelected() {
    return this._compensations.items.some((item) => item.isSelected === true);
  }

  get employeeId() {
    return this._compensations.items.find((item) => item.employeeId);
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

  get isChange() {
    return this._isChange;
  }

  setIsSelected(isSelected: boolean, id: number) {
    this._compensations.items.map((item) => {
      if (item.employeeId === id) {
        return item.isSelected = isSelected;
      }
      return item;
    });
  }

  initialize({
    loadedCompensations,
  }: {
    loadedCompensations: AllCompensationsType,
  }) {
    this._compensations = {
      items: [],
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

  updateStatus(newStatus: boolean) {
    this._isChange = newStatus;
  }
}

export function getFiltering(
  compensations: AllCompensationsItemType,
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
