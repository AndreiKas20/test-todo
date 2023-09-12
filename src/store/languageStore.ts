import {makeAutoObservable} from "mobx";

export type languageListType = 'rus' | 'eng'

// ---- Стейт хранения языка
class Language {
    initialState: languageListType = 'rus'

    constructor() {
        makeAutoObservable(this)
    }

    changeLanguage(language: languageListType) {
        this.initialState = language
    }


}

export default new Language()