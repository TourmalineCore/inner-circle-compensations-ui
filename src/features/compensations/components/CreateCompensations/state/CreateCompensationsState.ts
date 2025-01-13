import { makeAutoObservable } from 'mobx';

export class CreateCompensationsState {
  private _types: {
    typeId: number;
    label: string;
  }[] = [];

  private _compensationRequestedForYearAndMonth: Date | string = new Date();

  private _nextCompensationId: number = 1;

  private _isFilled: boolean = false;

  private _compensations: {
    id: number;
    typeId: number;
    comment: string;
    amount: number
  }[] = [
      {
        id: 0,
        typeId: 0,
        comment: '',
        amount: 0,
      },
    ];

  private _isTriedToSubmit = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isFilled() {
    return this._compensations.some((item) => item.typeId === 0 || item.amount === 0);
  }

  get isNegative() {
    return this._compensations.some((item) => item.amount < 0);
  }

  get allTypes() {
    return this._types.filter((item) => item.typeId !== 1
    && item.typeId !== 2
    && item.typeId !== 3
    && item.typeId !== 4
    && item.typeId !== 7
    && item.typeId !== 8
    && item.typeId !== 9);
  }

  get compensationRequestedForYearAndMonth() {
    return this._compensationRequestedForYearAndMonth;
  }

  get allCompensations() {
    return this._compensations;
  }

  get totalCount() {
    return this._compensations.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit;
  }

  initializeTypes({
    loadedTypes,
  }: {
    loadedTypes: {
      typeId: number;
      label: string;
    }[]
  }) {
    this._types = loadedTypes;
  }

  setIsTriedToSubmit(newValue: boolean) {
    this._isTriedToSubmit = newValue;
  }

  updateDate(newDate: Date | string) {
    this._compensationRequestedForYearAndMonth = newDate;
  }

  addCompensation(type?: number) {
    this._compensations.push({
      id: this._nextCompensationId,
      typeId: type || 0,
      comment: '',
      amount: 0,
    });

    this._nextCompensationId++;
  }

  removeCompensation(compensationId: number) {
    this._compensations = this._compensations.filter((compensation) => compensation.id !== compensationId);
  }

  removeCompensationsFromList() {
    this._compensations = [
      {
        id: 0,
        typeId: 0,
        comment: '',
        amount: 0,
      },
    ];
  }

  updateCompensation({
    id,
    typeId,
    comment,
    amount,
  }: {
    id: number;
    typeId: number;
    comment: string;
    amount: number
  }) {
    const compensationItem = this._compensations.find((compensation) => compensation.id === id);
    compensationItem!.typeId = Number(typeId);
    compensationItem!.comment = comment;
    compensationItem!.amount = amount;
  }
}
