import React, {useEffect, useMemo, useState} from 'react';
import styles from './HeadPage.module.scss'
import Field, {reqFields} from "./components/Field/Field";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {Button} from "@mui/material";
import BaseDialog from "../UI/BaseDialog/BaseDialog";
import {observer} from "mobx-react-lite";
import languageStore from "../../store/languageStore";
import typeFieldStore from "../../store/typeFieldStore";
import {fieldType} from "../Header/components/ToggleButtonComponent/ToggleButtonComponent";
import {useResize} from "../../hooks/useResize";
import MoveDialog from "../UI/MoveDialog/MoveDialog";


const HeadPage = observer(() => {
    const sizeWindow = useResize()
    const [isDialog, setIsDialog] = useState(false)
    const [isSettingDialog, setIsSettingDialog] = useState(false)
    const [fieldsArr, setFieldsArr] = useState<Array<reqFields>>(sizeWindow < 900 ? ['wait'] : ['wait', 'progress', 'done'])
    const appLanguage = languageStore.initialState
    const targetField = typeFieldStore.field

    // ---- Переключение между полями
    const changeFieldsArr = (field: fieldType) => {
        switch (field) {
            case "all":
                setFieldsArr(['wait', 'progress', 'done'])
                return
            case "wait":
                setFieldsArr(['wait'])
                return
            case "progress":
                setFieldsArr(['progress'])
                return
            case "done":
                setFieldsArr(['done'])
                return
            default: setFieldsArr(['wait', 'progress', 'done'])
        }
    }
    // ---------------------------------------
    const openDialog = () => {
        setIsDialog(true)
    }

    const closeDialog = () => {
        setIsDialog(false)
    }

    const openSettingDialog = () => {
        setIsSettingDialog(true)
    }

    const closeSettingDialog = () => {
        setIsSettingDialog(false)
    }

    useMemo(() => changeFieldsArr(targetField), [targetField])

    useEffect(() => {
        //---- При разрешении экрана меньше 900px можно просматривать только по одному полю
        if (sizeWindow < 900) {
            typeFieldStore.changeField('wait')
        } else {
            typeFieldStore.changeField('all')
        }
    }, [sizeWindow])

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.container}>
                {
                    fieldsArr.map(v => <Field key={v} openSettingDialog={openSettingDialog} typeField={v}/>)
                }
                <Button id={'btnAddItem'} className={styles.container__buttonAdd} variant="contained" onClick={openDialog}>
                    {
                        appLanguage === 'eng' ? 'Add a case' : 'Добавить дело'
                    }
                </Button>
                <BaseDialog typeDialog={'create'} closeDialog={closeDialog} stateDialog={isDialog}/>
                <BaseDialog typeDialog={'setting'} closeDialog={closeSettingDialog} stateDialog={isSettingDialog}/>
                <MoveDialog/>
            </div>
        </DndProvider>

    );
})

export default HeadPage;
