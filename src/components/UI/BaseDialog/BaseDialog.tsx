import React, {ChangeEvent, useEffect, useState} from 'react';
import {Dialog, Rating, TextField, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {nowStringDate} from "../../../utils/nowStringDate";
import {generateRandomString} from "../../../utils/getRandomString";
import todoStore, {ItemCard} from "../../../store/todoStore";
import dragFieldStore from "../../../store/dragFieldStore";
import {observer} from "mobx-react-lite";
import languageStore from "../../../store/languageStore";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface IDialog {
    typeDialog: 'setting' | 'create'
    stateDialog: boolean
    closeDialog: () => void
}

//---- Диалоговое окно для создания и изменения карточек с делами

const BaseDialog = observer(({closeDialog, stateDialog, typeDialog}: IDialog) => {
    const [name, setName] = useState('')
    const [descr, setDescr] = useState('')
    const [validDescr, setValidDescr] = useState(true)
    const [validName, setValidName] = useState(true)
    const [touchDescr, setTouchDescr] = useState(false)
    const [touchName, setTouchName] = useState(false)
    const [validForBtn, setValidForBtn] = useState(false)
    const [controlItem, setControlItem] = useState<ItemCard>()
    const [rate, setRate] = useState<number | null>(0)
    const controlField = dragFieldStore.initialState.value
    const arrTodosList = todoStore.initialState.todos
    const appLanguage = languageStore.initialState

    //---- Добавление дела
    const addTodo = () => {
        todoStore.addTask({
            name,
            id: generateRandomString(),
            description: descr,
            date: nowStringDate(),
            urgency: rate,
            position: "wait"
        }, 'wait')
        setDescr('')
        setName('')
        setRate(0)
        setValidForBtn(false)
        setTouchName(false)
        setTouchDescr(false)
    }
    //-------------------------

    //---- Изменение дела
    const changeTodo = () => {
        if (controlField.positionStart !== '') {
            todoStore.changeItem(controlField.id, controlField.positionStart, {
                name: name,
                description: descr,
                rate: rate,
            })
        }
        setDescr('')
        setName('')
        setRate(0)
        setValidForBtn(false)
        setTouchName(false)
        setTouchDescr(false)
    }
    //-------------------------------
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        if (event.target.value.length > 0) {
            setValidName(true)
        } else {
            setValidName(false)
        }
    }

    const handleDescrChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescr(event.target.value)
        if (event.target.value.length > 2) {
            setValidDescr(true)
        } else {
            setValidDescr(false)
        }
    }

    useEffect(() => {
        if (controlField.positionStart !== '') {
            const item = arrTodosList[controlField.positionStart].filter(v => v.id === controlField.id)[0]
            setControlItem(item)
        }

    }, [controlField.id, arrTodosList])

    useEffect(() => {
        if (typeDialog === 'setting' && controlItem) {
            setRate(controlItem.urgency)
            setName(controlItem.name)
            setDescr(controlItem.description ? controlItem.description : '')
        }
    }, [controlItem, typeDialog])

    useEffect(() => {
        if (typeDialog === 'create') {
            if (validName && validDescr && touchDescr && touchName) {
                setValidForBtn(true)
            } else {
                setValidForBtn(false)
            }
        } else {
            if (validName && validDescr) {
                setValidForBtn(true)
            } else {
                setValidForBtn(false)
            }
        }
    }, [validDescr, validName, touchName, touchDescr, typeDialog])
    return (
        <Dialog
            open={stateDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {
                    typeDialog === 'setting' ? appLanguage === 'eng' ? 'Case change' : 'Изменение дела' : appLanguage === 'eng' ? 'Adding a case' : 'Добавление дела'
                }
            </DialogTitle>
            <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    sx={{marginBottom: '15px'}}
                    error={!validName}
                    onBlur={() => {
                        setTouchName(true)
                    }}
                    onChange={handleNameChange}
                    id="inputName" value={name}
                    label={appLanguage === 'eng' ? 'Name' : 'Название'} variant="standard"
                    helperText={!validName ? appLanguage === 'eng' ? 'The Name cannot be empty' : 'Название не может быть пустым' : ''}
                />

                <TextField
                    error={!validDescr}
                    onBlur={() => {
                        setTouchDescr(true)
                    }}
                    id="inputNameDescription"
                    label={appLanguage === 'eng' ? 'Description' : 'Описание'}
                    onChange={handleDescrChange}
                    multiline
                    rows={4}
                    variant="standard"
                    value={descr}
                    helperText={!validDescr ? appLanguage === 'eng' ? 'The description cannot be empty' : 'Описание не может быть пустым' : ''}
                />
                <Typography component="legend">
                    {
                        appLanguage === 'eng' ? 'Urgency' : 'Срочность'
                    }
                </Typography>
                <Rating
                    name="simple-controlled"
                    value={rate}
                    max={2}
                    onChange={(event, newValue) => {
                        setRate(newValue);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>
                    {
                        appLanguage === 'eng' ? 'Close' : 'Закрыть'
                    }
                </Button>
                {
                    typeDialog === 'setting' ?
                        <Button
                            disabled={!validForBtn}
                            onClick={() => {
                            closeDialog()
                            changeTodo()
                        }}>
                            {
                                appLanguage === 'eng' ? 'Save changes' : 'Сохранить изменения'
                            }
                        </Button> :
                        <Button
                            disabled={!validForBtn}
                            id={'btnAddDialog'} onClick={() => {
                            closeDialog()
                            addTodo()
                        }}>
                            {
                                appLanguage === 'eng' ? 'Add' : 'Добавить'
                            }
                        </Button>
                }
            </DialogActions>
        </Dialog>
    );
})

export default BaseDialog;
