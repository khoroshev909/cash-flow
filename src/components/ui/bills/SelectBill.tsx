import React, {FC, useState, useContext} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {IBill} from '../../../types/models';
import {AccountInfo} from '../../index'
import { CurrentBillContext } from '../../pages/HomePage';

interface SelectBillProps {
    bills: IBill[],
    current?: IBill
}

export const SelectBill:FC<SelectBillProps> = React.memo(({ bills, current }) => {

  const { setCurrent } = useContext(CurrentBillContext)

  const handleChange = (event: SelectChangeEvent) => {
    setCurrent(bills.find(b => b.account === event.target.value))
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Выберите счёт</InputLabel>
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={current?.account}
            onChange={handleChange}
            label="Выберите счёт">
            {bills.map((bill) => (
                <MenuItem key={bill._id} value={bill.account}>
                    <AccountInfo bill={bill} />
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  )
})