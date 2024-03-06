import { makeAutoObservable } from 'mobx';
import moment from 'moment';

export class AllCompensationsState {
  private _compensations: AllCompensationsType = {
    items: [],
    totalAmount: 0,
    totalUnpaidAmount: 0,
  };

  private _compensationsItem: AllCompensationsItemType = {
    employeeId: 0,
    employeeFullName: 'string',
    dateCompensation: 'string',
    totalAmount: 100,
    unpaidAmount: 100,
    compensations: [],
    isPaid: false,
  };

  private _filterTerm = 'unpaid';

  private _searchTerm = '';

  private _isChange = false;

  private _selectedDate: Date = new Date().getDate() <= 15 ? moment(new Date()).subtract(1, 'month').toDate() : new Date();

  constructor() {
    makeAutoObservable(this);
  }

  get allCompensations() {
    return {
      items: this._compensations.items.filter((item) => getFiltering(item, this._filterTerm)),
      totalAmount: this._compensations.totalAmount,
      totalUnpaidAmount: this._compensations.totalUnpaidAmount,
    };
  }

  get totalCount() {
    return this._compensations.totalAmount;
  }

  get totalUnpaidCount() {
    return this._compensations.totalUnpaidAmount;
  }

  get filterTerm() {
    return this._filterTerm;
  }

  get selectedDate() {
    return this._selectedDate;
  }

  get monthYearDate() {
    const month = this._selectedDate.getMonth() + 1;
    const year = this._selectedDate.getFullYear();
    return { month, year };
  }

  get isChange() {
    return this._isChange;
  }

  initialize({
    loadedCompensations,
  }: {
    loadedCompensations: AllCompensationsType,
  }) {
    this._compensations = {
      items: [],
      totalAmount: 0,
      totalUnpaidAmount: 0,
    };
    this._compensations = loadedCompensations;
  }

  updateFilterTerm(newFilterTerm: string) {
    this._filterTerm = newFilterTerm;
  }

  updateSearchTerm(newSearchTerm: string) {
    this._searchTerm = newSearchTerm;
  }

  updateDate(newDate: Date) {
    this._selectedDate = newDate;
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
