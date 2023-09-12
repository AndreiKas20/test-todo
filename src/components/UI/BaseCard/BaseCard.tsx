import React from 'react';
import {Button, Card, CardActions, CardContent, Rating, Typography} from "@mui/material";
import {useDrag} from "react-dnd";
import todoStore, {ItemCard} from "../../../store/todoStore";
import {observer} from "mobx-react-lite";
import dragFieldStore from "../../../store/dragFieldStore";
import languageStore from "../../../store/languageStore";
import dialogStore from "../../../store/dialogStore";

interface IIemTodo {
    itemCard: ItemCard
    openSetting: () => void
}

const BaseCard = observer(({itemCard, openSetting}: IIemTodo) => {
    const {name, id, description, date, urgency, position} = itemCard
    const appLanguage = languageStore.initialState
    const [, drag] = useDrag(() => ({
        type: 'card',
        item: {
            id: id,
        },
    }))

    const deleteCard = () => {
        todoStore.deleteItem(id, position)
    }

    const handleMove = () => {
        dialogStore.setIsOpen(true)
    }

    return (
        <Card onMouseDown={() => {
            dragFieldStore.changeField(id, position)
        }} style={{cursor: "move", marginBottom: '20px', width: '48%'}} ref={drag} sx={{minWidth: 275}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {
                        appLanguage === 'eng' ? 'Urgency level' : 'Уровень срочности'
                    }: {
                    <Rating
                        readOnly
                        name="simple-controlled"
                        value={urgency}
                        max={2}
                    />
                }
                </Typography>
                <Typography id={'nameCard'} variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {
                        appLanguage === 'eng' ? 'Date added' : 'Дата добавления'
                    }: {
                    date
                }
                </Typography>
                <Typography id={'descriptionCard'} variant="body2" color="text.secondary">
                    {
                        description
                    }
                </Typography>
            </CardContent>
            <CardActions style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={openSetting} size="small">
                    {
                        appLanguage === 'eng' ? 'Change' : 'Изменить'
                    }
                </Button>
                <Button onClick={handleMove} size="small">
                    {
                        appLanguage === 'eng' ? 'Move' : 'Переместить'
                    }
                </Button>
                <Button onClick={deleteCard} size="small">
                    {
                        appLanguage === 'eng' ? 'Delete' : 'Удалить'
                    }
                </Button>
            </CardActions>
        </Card>
    );
})

export default BaseCard;
