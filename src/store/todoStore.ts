import {makeAutoObservable} from "mobx";
import {reqFields} from "../components/HeadPage/components/Field/Field";
import {nowStringDate} from "../utils/nowStringDate";
import {generateRandomString} from "../utils/getRandomString";

export type ItemCard = {
    name: string,
    description?: string,
    id: string,
    urgency: number | null,
    date?: string,
    position: reqFields
}

// ---- Стор для хранения и изменения списка дел
export interface ITodo {
    todos: {
        wait: Array<ItemCard>,
        progress: Array<ItemCard>,
        done: Array<ItemCard>
    }
}

class ArrayTask {
    initialState: ITodo = {
        todos: {
            wait: [
                {
                    name: 'Отправить тестовое',
                    description: '',
                    urgency: 2,
                    date: nowStringDate(),
                    id: generateRandomString(),
                    position: "wait"
                },
                {
                    name: 'Приготовить ужин',
                    description: '',
                    urgency: 1,
                    date: nowStringDate(),
                    id: generateRandomString(),
                    position: "wait"
                },
            ],
            progress: [
                {
                    name: 'Начать тестовое',
                    description: 'Приложение задач',
                    urgency: 2,
                    date: nowStringDate(),
                    id: generateRandomString(),
                    position: "progress"
                },
            ],
            done: [
                {
                    name: 'Купить кота',
                    description: 'Чеширского',
                    urgency: 0,
                    date: nowStringDate(),
                    id: generateRandomString(),
                    position: "done"
                },
            ],
        },
    }

    constructor() {
        makeAutoObservable(this)
    }
    // ---- Добавление дела
    addTask( item: ItemCard, nameField: reqFields ) {
        this.initialState.todos[nameField as reqFields].push(item)
    }
    // ---- Изменение позиции дела
    changePosition( nameFieldDrag: reqFields, nameFieldDrop: reqFields, id: string ) {
        const copyItem = JSON.stringify(this.initialState.todos[nameFieldDrag].filter((v) => v.id === id)[0])
        this.initialState.todos[nameFieldDrop].push(JSON.parse(copyItem))
        this.initialState.todos[nameFieldDrop].filter(value => value.id === id)[0].position = nameFieldDrop
        const delIndex = this.initialState.todos[nameFieldDrag].findIndex(value => value.id === id)
        this.initialState.todos[nameFieldDrag].splice(delIndex, 1)
    }
    // ---- Удаление дела
    deleteItem(id: string, nameField: reqFields) {
        const delIndex = this.initialState.todos[nameField].findIndex(value => value.id === id)
        this.initialState.todos[nameField].splice(delIndex, 1)
    }
    // ---- Изменение имени, описания и срочности дела
    changeItem(id: string, nameField: reqFields, newItem: { name: string, description: string, rate: number | null } ) {
        const findIndex = this.initialState.todos[nameField].findIndex(value => value.id === id)
        const controlItem = this.initialState.todos[nameField].at(findIndex)
        if (controlItem) {
            controlItem.name = newItem.name
            controlItem.description = newItem.description
            controlItem.urgency = newItem.rate
        }
    }
}

export default new ArrayTask()