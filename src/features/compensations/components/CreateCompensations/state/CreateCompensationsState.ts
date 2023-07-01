import { makeAutoObservable } from 'mobx';

class CreateCompensationsState {
  private _types: {
    label: string;
    value: string;
  }[] = [];

  private _dateCompensation: Date | string = new Date();

  private _nextSourceFeedId: number = 1;

  private _compensations: {
    id: number;
    type: string;
    comment: string;
    amount: number
  }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allTypes() {
    return this._types;
  }

  get dateCompensation() {
    return this._dateCompensation;
  }

  get allCompensations() {
    return this._compensations;
  }

  initializeTypes({
    loadedTypes,
  }: {
    loadedTypes: {
      label: string;
      value: string;
    }[]
  }) {
    this._types = loadedTypes;
  }

  updateDate(newDate: Date | string) {
    this._dateCompensation = newDate;
  }

  addCompensation(type?: string) {
    this._compensations.push({
      id: this._nextSourceFeedId,
      type: type || '',
      comment: '',
      amount: 0,
    });

    this._nextSourceFeedId++;
  }

  removeCompensation(compensationId: number) {
    this._compensations = this._compensations.filter((compensation) => compensation.id !== compensationId);
  }

  updateCompensation({
    id,
    type,
    comment,
    amount,
  }: {
    id: number;
    type: string;
    comment: string;
    amount: number
  }) {
    const compensationItem = this._compensations.find((compensation) => compensation.id === id);

    compensationItem!.type = type;
    compensationItem!.comment = comment;
    compensationItem!.amount = amount;
  }
}

export default CreateCompensationsState;
