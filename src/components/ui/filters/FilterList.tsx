import React, {FC, useMemo} from 'react';
import Grid from '@mui/material/Grid';
import {AccountFilter, BanksFilter, AccountTypesFilter} from "../../index"
import {BANK_TYPES, IBill} from "../../../types/models";
import {IFund} from "../../../store/funds/types";

interface FiltersProps {
    bills: IBill[],
    funds: IFund[],
    banks: BANK_TYPES[],
    onFilterAccount: (filtered: string[]) => void,
    onFilterBanks: (filtered: string[]) => void,
    onFilterAccountTypes: (filtered: string[]) => void,
}
export const FilterList:FC<FiltersProps> = React.memo(({ bills, funds, banks, onFilterAccount, onFilterBanks, onFilterAccountTypes }) => {



    return (
        <Grid container direction="column" spacing={3}>
            <Grid item>
                <AccountFilter bills={bills} onFilterAccount={onFilterAccount} />
            </Grid>
            <Grid item>
                <BanksFilter banks={banks} onFilterBanks={onFilterBanks} />
            </Grid>
            <Grid item>
                <AccountTypesFilter onFilterAccountTypes={onFilterAccountTypes} />
            </Grid>
        </Grid>
    );
});

