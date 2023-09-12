import React, {useState} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import languageStore from "../../../../store/languageStore";
import {observer} from "mobx-react-lite";


const Language = observer(() => {
    const [language, setLanguage] = useState('rus')
    const appLanguage = languageStore.initialState
    //---- Переключение языка приложения
    const handleChangeLanguage = (e: SelectChangeEvent) => {
        setLanguage(e.target.value)
        if (e.target.value === 'eng' || e.target.value === 'rus') {
            languageStore.changeLanguage(e.target.value)
        }
    }
    return (
        <Box sx={{width: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {
                        appLanguage === 'eng' ? 'Язык' : 'Language'
                    }
                </InputLabel>
                <Select
                    value={language}
                    label={appLanguage === 'eng' ? 'Язык' : 'Language'}
                    onChange={handleChangeLanguage}
                >
                    <MenuItem value={'eng'}>Eng</MenuItem>
                    <MenuItem value={'rus'}>Рус</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
})

export default Language;
