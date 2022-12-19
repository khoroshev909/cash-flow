import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import {BANK_TYPES, banksMap} from "../../../types/models";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import {Title} from "../../reusable/Title";

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

interface BanksFilterProps {
    banks: BANK_TYPES[]
}
export const BanksFilter:FC<BanksFilterProps> = React.memo(({ banks }) => {

    const [values, setValues] = useState<string[]>(banks);

    const changeHandler = (event: SelectChangeEvent<typeof values>) => {
        const {value} = event.target
        setValues(typeof value === 'string' ? value.split(',') : value)
    };

    return (
       <Box>
           <FormControl fullWidth>
               <Title>По банку</Title>
               <Select
                   multiple
                   value={values}
                   onChange={changeHandler}
                   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                   renderValue={(selected) => (
                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                           {banks.filter(bank => selected.includes(bank)).map((bank) => (
                               <Chip
                                   key={bank}
                                   label={banksMap[bank]} />
                           ))}
                       </Box>
                   )}
                   MenuProps={MenuProps}
               >
                   {banks.map((bank) => (
                       <MenuItem
                           key={bank}
                           value={bank}>
                           {banksMap[bank]}
                       </MenuItem>
                   ))}
               </Select>
           </FormControl>
       </Box>
    );
});

