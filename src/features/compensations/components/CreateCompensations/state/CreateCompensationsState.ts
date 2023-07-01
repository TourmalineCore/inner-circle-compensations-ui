import { makeAutoObservable } from 'mobx';

class CreateCompensations {
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

  addCompensation() {
    this._compensations.push({
      id: this._nextSourceFeedId,
      type: '',
      comment: '',
      amount: 0,
    });

    this._nextSourceFeedId++;
  }
}

export default CreateCompensations;
