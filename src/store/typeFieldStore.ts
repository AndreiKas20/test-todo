import {makeAutoObservable} from "mobx";
import {fieldType} from "../components/Header/components/ToggleButtonComponent/ToggleButtonComponent";


class Field {
    field: fieldType = 'all'

    constructor() {
        makeAutoObservable(this)
    }

    changeField(field: fieldType) {
        this.field = field
    }


}

export default new Field()