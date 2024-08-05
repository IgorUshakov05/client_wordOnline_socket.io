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
        if (state === this.activeState) return this.activeState = ''
        this.activeState = state 
    }

    getValue() {
        return this.activeState
    }
}

const activeStateUserSelect = new ActiveStateButton()
export default activeStateUserSelect
