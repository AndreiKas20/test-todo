import {reqFields} from "../components/HeadPage/components/Field/Field";

export const typeFieldWord = (field: reqFields) => {
    switch (field) {
        case "wait":
            return 'Ожидает выполнения'
        case "progress":
            return 'В процессе'
        case "done":
            return 'Выполнено'
        default: return ''
    }
}
