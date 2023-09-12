import {makeAutoObservable} from "mobx";
import {reqFields} from "../components/HeadPage/components/Field/Field";

interface INameField {
    value: {
        id: string,
        positionStart: reqFields | '',
    }
}
//---- Стейт для отслеживания карточки в начале перемещения
class DragField {

    initialState: INameField = {
        value: {
            id: '',
            positionStart: '',
        }
    }

    constructor() {
        makeAutoObservable(this)
    }

    changeField(id: string, positionStart: reqFields) {
        this.initialState.value.id = id
        this.initialState.value.positionStart = positionStart
    }
}

export default new DragField()