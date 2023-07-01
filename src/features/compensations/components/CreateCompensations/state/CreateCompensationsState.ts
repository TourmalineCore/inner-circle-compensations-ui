import { makeAutoObservable } from 'mobx';

class CreateCompensations {
  private _types: {
    label: string;
    value: string;
  }[] = [];

  private _dateCompensation: Date | string = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  get allTypes() {
    return this._types;
  }

  get dateCompensation() {
    return this._dateCompensation;
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
}

export default CreateCompensations;
