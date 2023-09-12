import React, {useEffect, useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import dialogStore from "../../../store/dialogStore";
import languageStore from "../../../store/languageStore";
import {observer} from "mobx-react-lite";
import DialogContent from "@mui/material/DialogContent";
import {DialogContentText, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import dragFieldStore from "../../../store/dragFieldStore";
import todoStore from "../../../store/todoStore";
import {typeFieldWord} from "../../../utils/typeFieldWord";
import {reqFields} from "../../HeadPage/components/Field/Field";
import styles from './MoveDialog.module.scss'
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


const MoveDialog = observer(() => {
    const isOpen = dialogStore.isOpenMoveDialog
    const appLanguage = languageStore.initialState
    const dragCard = dragFieldStore.initialState.value
    const arrCard = todoStore.initialState.todos
    const targetCard = arrCard[dragCard.positionStart !== '' ? dragCard.positionStart : 'wait'].filter(value => value.id === dragCard.id)[0]
    const arrFields = ['wait', 'progress', 'done'].filter(value => value !== dragCard.positionStart)
    const [targetField, setTargetField] = useState('')

    const handleChangeTargetField = (e: SelectChangeEvent) => {
        setTargetField(e.target.value)
    }
    const handleClose = () => {
        dialogStore.setIsOpen(false)
        setTargetField('')
    }

    const handleMove = () => {
        todoStore.changePosition(dragCard.positionStart as reqFields, targetField as reqFields, dragCard.id)
        handleClose()
    }

    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>
                {
                    appLanguage === 'eng' ? 'Moving a card' : 'Перемещение карточки'
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{marginBottom: '25px'}} className={styles.line}>
                    {appLanguage === "eng" ? 'Name of the selected card' : 'Название выбранной карточки'} : <strong>{targetCard?.name}</strong>
                </DialogContentText>
                <DialogContentText style={{marginBottom: '5px'}} className={styles.line}>
                    {appLanguage === "eng" ? 'Move from' : 'Переместить из'} : <strong>{typeFieldWord(targetCard?.position)}</strong>
                </DialogContentText>
                <div className={styles.line}>
                    <DialogContentText >
                        {appLanguage === "eng" ? 'Move to' : 'Переместить в'} :

                    </DialogContentText>
                    <FormControl sx={{minWidth: '120px'}}>
                        <InputLabel id="demo-simple-select-label">
                            {appLanguage === 'eng' ? 'Field' : 'Поле'}
                        </InputLabel>
                        <Select
                            value={targetField}
                            label={appLanguage === 'eng' ? 'Field' : 'Поле'}
                            onChange={handleChangeTargetField}
                        >
                            {
                                arrFields.map(value => <MenuItem key={value}
                                                                 value={value}>{typeFieldWord(value as reqFields)}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {
                            appLanguage === 'eng' ? 'Close' : 'Закрыть'
                        }
                    </Button>
                    <Button onClick={handleMove}>
                        {
                            appLanguage === 'eng' ? 'Move' : 'Переместить'
                        }
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
})

export default MoveDialog;
