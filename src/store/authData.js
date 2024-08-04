import { makeObservable, observable, action } from "mobx"

class loginData {
    login = ""

    constructor(login = "") {
        makeObservable(this, {
            login: observable,
            setLogin: action,
        })
        this.login = login
    }

    setLogin(login) {
        this.login = login // устанавливаем новое значение
    }

    get getLogin() {
        return this.login // геттер
    }
}

const loginAuth = new loginData()
export default loginAuth
