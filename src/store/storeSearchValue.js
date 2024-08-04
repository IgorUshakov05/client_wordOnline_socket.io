import { makeObservable, observable, action } from "mobx"

class InputSearch {
    value = ""

    constructor(value = "") {
        makeObservable(this, {
            value: observable,
            setValue: action,
        })
        this.value = value
    }

    setValue(value) {
        this.value = value // устанавливаем новое значение
    }

    get getValue() {
        return this.value // геттер
    }
}

const inputSearch = new InputSearch()
export default inputSearch
