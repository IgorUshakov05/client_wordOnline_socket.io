import { makeObservable, observable, action } from "mobx";

class InputValueTitle {
  title = ""; // Наблюдаемое свойство
  ref = null; // Наблюдаемое свойство для ref

  constructor() {
    makeObservable(this, {
      title: observable,
      ref: observable,
      setValue: action,
      setRef: action,
    });
  }

  setValue(value) {
    this.title = value;
  }

  setRef(ref) {
    this.ref = ref;
  }

  getRef() {
    return this.ref;
  }

  getValue() {
    return this.title;
  }
}

const inputValueTitle = new InputValueTitle();
export default inputValueTitle;
