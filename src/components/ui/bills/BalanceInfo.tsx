import React, {FC} from 'react';
import {CURRENCY_CODE} from '../../../types/models'
import Typography from '@mui/material/Typography';
import parseBalance from '../../../utils/parseBalance'
import {CurrencyIcon} from '../../index'
import Box from "@mui/material/Box";

interface BalanceProps {
    balance: number,
    currency: CURRENCY_CODE,
    iconSize: number
    variant?: 'body1' | 'body2'| 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
}

export const BalanceInfo:FC<BalanceProps> = React.memo(({ balance, currency, iconSize, variant='body1' }) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <CurrencyIcon code={currency} size={iconSize} />
            <Typography variant={variant}>{parseBalance(balance)}</Typography>
        </Box>  
    )
})
