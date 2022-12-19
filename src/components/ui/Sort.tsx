import React, {FC, PropsWithChildren, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {SORT_FUNDS, SortItem} from "../../types/models";
export const Sort:FC = React.memo(() => {

    const [sort, setSort] = useState(SORT_FUNDS.CREATED_DESC)

    const sortItems: SortItem[] = [
        { label: 'дате (DESC)', value: SORT_FUNDS.CREATED_DESC },
        { label: 'дате (ASC)', value: SORT_FUNDS.CREATED_ASC },
        { label: 'сумме (DESC)', value: SORT_FUNDS.AMOUNT_DESC },
        { label: 'сумме (ASC)', value: SORT_FUNDS.AMOUNT_ASC },
    ];
    const changeHandler = (event: SelectChangeEvent) => {
        setSort(event.target.value as SORT_FUNDS)
    };

    return (
        <FormControl variant="standard" fullWidth>
            <Select
                value={sort}
                onChange={changeHandler}>
                    {sortItems.map(item => (
                      <MenuItem
                          key={item.value}
                          value={item.value}>
                          {item.label}
                      </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
});

