import React, {useEffect, useState} from 'react';
import {FormControl, FormLabel, styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {reqFields} from "../../../HeadPage/components/Field/Field";
import typeFieldStore from "../../../../store/typeFieldStore";
import {observer} from "mobx-react-lite";
import languageStore from "../../../../store/languageStore";
import {useResize} from "../../../../hooks/useResize";

export type fieldType = 'all' | reqFields

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    '& .MuiToggleButtonGroup-grouped': {
        borderRadius: '8px',
        textTransform: 'none',
        '&.MuiToggleButton-root': {
            border: '1px solid #666666',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: '600',
            color: '#5c91ce',
            '&.Mui-selected': {
                backgroundColor: 'rgba(0,126,250,0.2)',
                color: '#FFF',
            },
        },
    },
}))

const ToggleButtonComponent = observer(() => {
    const appLanguage = languageStore.initialState
    const targetField = typeFieldStore.field
    const [fieldTarget, setFieldTarget] = useState<fieldType>('all')
    const sizeWindow = useResize()
    //----Переключение типа видимого поля
    const handleChangeTargetField = (event: React.MouseEvent<HTMLElement>, val: fieldType | null) => {
        if (val === null) return
        setFieldTarget(val)
        typeFieldStore.changeField(val)
    }

    useEffect(() => {
        setFieldTarget(targetField)
    }, [targetField])

    return (
        <FormControl style={{padding: '10px'}}>
            <FormLabel style={{marginBottom: '10px', fontSize: '21px'}} id="buttons-group">
                {
                    appLanguage === 'eng' ? 'Show' : 'Показывать'
                }
            </FormLabel>
            <StyledToggleButtonGroup value={fieldTarget} onChange={handleChangeTargetField} exclusive size='small'>
                {
                    sizeWindow > 900 ? <ToggleButton value='all'>
                        {
                            appLanguage === 'eng' ? 'All fields' : 'Все поля'
                        }
                    </ToggleButton> : ''
                }
                <ToggleButton value='wait'>
                    {
                        appLanguage === 'eng' ? 'Awaiting execution' : 'Ожидает выполнения'
                    }
                </ToggleButton>
                <ToggleButton value='progress'>
                    {
                        appLanguage === 'eng' ? 'In progress' : 'В процессе'
                    }
                </ToggleButton>
                <ToggleButton value='done'>
                    {
                        appLanguage === 'eng' ? 'Done' : 'Выполнено'
                    }
                </ToggleButton>
            </StyledToggleButtonGroup>
        </FormControl>
    );
})

export default ToggleButtonComponent;
