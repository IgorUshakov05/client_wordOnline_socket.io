import { makeObservable, observable, action } from "mobx";

class InputSearch {
  value = "";
  ref = null;
  constructor() {
    makeObservable(this, {
      value: observable,
      ref: observable,
      setValue: action,
      setRef: action,
    });
  }

  setValue(value) {
    this.value = value; // устанавливаем новое значение
  }

  get getValue() {
    return this.value; // геттер
  }

  getRef() {
    return this.ref;
  }
  setRef(ref) {
    this.ref = ref;
  }
}

const inputSearch = new InputSearch();
export default inputSearch;
