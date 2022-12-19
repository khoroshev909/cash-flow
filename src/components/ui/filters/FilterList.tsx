import React, {FC, useMemo} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AccountFilter, BanksFilter, AccountTypesFilter} from "../../index"
import {IBill} from "../../../types/models";
import {IFund} from "../../../store/funds/types";

interface FiltersProps {
    bills: IBill[],
    funds: IFund[]
}
export const FilterList:FC<FiltersProps> = React.memo(({ bills, funds }) => {

    const banks =  useMemo(() => Array.from(new Set(bills?.map(bill => bill.bank))), [bills])

    return (
        <Grid container direction="column" spacing={3}>
            <Grid item>
                {/*<Paper sx={{ p: 3  }}>*/}
                    <AccountFilter bills={bills} />
                {/*</Paper>*/}
            </Grid>
            <Grid item>
                {/*<Paper sx={{ p: 3  }}>*/}
                    <BanksFilter banks={banks} />
                {/*</Paper>*/}
            </Grid>
            <Grid item>
                {/*<Paper sx={{ p: 3  }}>*/}
                    <AccountTypesFilter />
                {/*</Paper>*/}
            </Grid>
        </Grid>
    );
});

