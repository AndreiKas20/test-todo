import {makeAutoObservable} from "mobx";

// ---- Переключение стейта диалога перемещения
class MoveDialog {
    isOpenMoveDialog: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsOpen(isOpen: boolean) {
        this.isOpenMoveDialog = isOpen
    }


}

export default new MoveDialog()