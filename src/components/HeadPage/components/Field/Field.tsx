import React, {useEffect, useState} from 'react';
import styles from './Field.module.scss'
import BaseCard from "../../../UI/BaseCard/BaseCard";
import {useDrop} from "react-dnd";
import dragFieldStore from "../../../../store/dragFieldStore";
import todoStore from "../../../../store/todoStore";
import {observer} from "mobx-react-lite";
import languageStore from "../../../../store/languageStore";
import typeFieldStore from "../../../../store/typeFieldStore";

export type reqFields = 'wait' | 'progress' | 'done'

export interface IField {
    typeField: reqFields
    openSettingDialog: () => void
}

const Field = observer(({typeField, openSettingDialog}: IField) => {
    const dragStart = dragFieldStore.initialState.value
    const arrTodosList = todoStore.initialState.todos
    const [stateArs, setStateArs] = useState(arrTodosList)
    const [dragStartItem, setDragStartItem] = useState(dragStart)
    const appLanguage = languageStore.initialState
    const targetField = typeFieldStore.field
    const [, drop] = useDrop(
        () => ({
            accept: 'card',
            drop: () => {
                if (dragStartItem.id !== '' && dragStartItem.positionStart !== '') {
                    todoStore.changePosition(dragStartItem.positionStart, typeField, dragStartItem.id)
                }
            },
        }),
        [dragStartItem, arrTodosList]
    )
    useEffect(() => {
        setStateArs(arrTodosList)
    }, [arrTodosList])

    useEffect(() => {
        setDragStartItem(dragStart)
    }, [dragStart])
    return (
        <div ref={drop} id={'3'}  className={styles.field}
             style={{backgroundColor: typeField === "wait" ? '#ffcfcf' : typeField === 'progress' ? '#fef0e0' : '#ceffbc',
                 flexBasis: targetField === 'all' ? '33.333333%' : '100%'}}>
            <h3 className={styles.field__subtitle}>
                {
                    typeField === 'wait' ? appLanguage === 'eng' ? 'Awaiting execution' : 'Ожидает выполнения'
                        : typeField === 'progress' ? appLanguage === 'eng' ? 'In progress ' : 'В процессе'
                            : appLanguage === 'eng' ? 'Done' : 'Выполнено'
                }
            </h3>

            <ul className={styles.field__cardList}>
                {
                    typeField === 'wait' ?
                        stateArs.wait.map((v) => <BaseCard key={v.id} openSetting={openSettingDialog} itemCard={v}/>)
                        : typeField === 'progress' ?
                            stateArs.progress.map((v) => <BaseCard key={v.id} openSetting={openSettingDialog}
                                                                   itemCard={v}/>)

                            : stateArs.done.map((v) => <BaseCard key={v.id} openSetting={openSettingDialog} itemCard={v}/>)
                }
            </ul>
        </div>
    );
})

export default Field;
