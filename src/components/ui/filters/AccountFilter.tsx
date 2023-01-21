import React, {FC, useEffect, useState} from 'react';
import {AccountInfo, Title} from "../../index"
import {IBill} from "../../../types/models";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import {toast} from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface AccountFilterProps {
    bills: IBill[],
    onFilterAccount: (filtered: string[]) => void
}
export const AccountFilter:FC<AccountFilterProps> = React.memo(({ bills, onFilterAccount }) => {

    const [values, setValues] = useState<string[]>(bills.map(bill => bill._id));
    const changeHandler = (event: SelectChangeEvent<typeof values>) => {
        const {value} = event.target
        const newValues = typeof value === 'string' ? value.split(',') : value
        setValues(newValues)
        onFilterAccount(newValues)
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Title>По счёту</Title>
            <FormControl fullWidth>
                <Select
                    multiple
                    value={values}
                    onChange={changeHandler}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {bills.filter(bill => selected.includes(bill._id)).map((bill) => (
                                <Chip
                                    key={bill._id}
                                    label={<AccountInfo bill={bill} />} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {bills.map((bill) => (
                        <MenuItem
                            key={bill._id}
                            value={bill._id}>
                            <AccountInfo bill={bill}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
})
