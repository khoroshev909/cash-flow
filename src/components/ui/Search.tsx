import React, {ChangeEvent, FC, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const Search:FC = React.memo(() => {

    const [search, setSearch] = useState<string>('')

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <FormControl variant="standard" fullWidth>
            <Input
                placeholder="Поиск по операциям"
                value={search}
                onChange={changeHandler}
                fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
});
