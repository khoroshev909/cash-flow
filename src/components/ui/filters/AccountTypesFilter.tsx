import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import {billTypesMap} from "../../../types/models";
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

export const AccountTypesFilter:FC = React.memo(() => {

    const billTypes = Object.keys(billTypesMap)

    const [values, setValues] = useState(billTypes);

    const changeHandler = (event: SelectChangeEvent<typeof values>) => {
        const {value} = event.target
        setValues(typeof value === 'string' ? value.split(',') : value)
    };

    return (
        <Box>
            <FormControl fullWidth>
                <Title>По типу счёта</Title>
                <Select
                    label={false}
                    multiple
                    value={values}
                    onChange={changeHandler}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {billTypes.filter((item) => selected.includes(item)).map((item) => (
                                <Chip
                                    key={item}
                                    label={item}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {billTypes.map((item) => (
                        <MenuItem
                            key={item}
                            value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
});

