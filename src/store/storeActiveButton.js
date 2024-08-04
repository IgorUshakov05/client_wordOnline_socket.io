import { makeObservable, observable, action } from "mobx"

class ActiveStateButton {
    activeState = ""

    constructor(state = "") {
        makeObservable(this, {
            activeState: observable,
            setActiveState: action,
        })
        this.activeState = state
    }

    setActiveState(state) {
        this.activeState = state // устанавливаем новое значение
    }

    get getValue() {
        return this.activeState
    }
}

const activeStateUserSelect = new ActiveStateButton()
export default activeStateUserSelect
