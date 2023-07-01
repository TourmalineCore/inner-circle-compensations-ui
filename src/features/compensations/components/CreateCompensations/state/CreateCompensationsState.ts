import { makeAutoObservable } from 'mobx';

class CreateCompensations {
  private _types: {
    label: string;
    value: string;
  }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allTypes() {
    return this._types;
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
}

export default CreateCompensations;
