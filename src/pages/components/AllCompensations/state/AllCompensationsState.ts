import { makeAutoObservable } from 'mobx'
import moment from 'moment'

export class AllCompensationsState {
  private _compensations: AllCompensationsType = {
    items: [],
    totalAmount: 0,
    totalUnpaidAmount: 0,
  }

  private _filterTerm = ``

  private _isChange = false

  private _selectedDate: Date = getSelectedDate(new Date())

  constructor() {
    makeAutoObservable(this)
  }

  get allCompensations() {
    return {
      items: this._compensations.items.filter((item) => getFiltering(item, this._filterTerm)),
      totalAmount: this._compensations.totalAmount,
      totalUnpaidAmount: this._compensations.totalUnpaidAmount,
    }
  }

  get totalCount() {
    return this._compensations.totalAmount
  }

  get totalUnpaidCount() {
    return this._compensations.totalUnpaidAmount
  }

  get filterTerm() {
    return this._filterTerm
  }

  get selectedDate() {
    return this._selectedDate
  }

  get monthYearDate() {
    const month = this._selectedDate.getMonth() + 1
    const year = this._selectedDate.getFullYear()
    return {
      month,
      year,
    }
  }

  get isChange() {
    return this._isChange
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
    }
    this._compensations = loadedCompensations
  }

  updateFilterTerm(newFilterTerm: string) {
    this._filterTerm = newFilterTerm
  }

  updateDate(newDate: Date) {
    this._selectedDate = newDate
  }

  updateStatus(newStatus: boolean) {
    this._isChange = newStatus
  }

  setFilterTerm() {
    this._filterTerm = this._compensations.items.some((item) => !item.isPaid) ? `unpaid` : `all`
  }
}

export function getFiltering(
  compensations: AllCompensationsItemType,
  filterTerm: string,
) {
  if (filterTerm === `unpaid`) {
    return !compensations.isPaid
  }

  return compensations
}

export function getSelectedDate(
  date: Date,
) {
  return date.getDate() <= 15 ? moment(date)
    .subtract(1, `month`)
    .toDate() : date
}
