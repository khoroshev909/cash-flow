import React, {FC} from 'react';
import Typography from '@mui/material/Typography';
import {BANK_TYPES, BILL_TYPES, banksMap, billTypesMap} from '../../../types/models'
import getHiddenAccount from '../../../utils/getHiddenAccount'

interface AccountInfoProps {
    type: BILL_TYPES,
    bank: BANK_TYPES,
    account: string
}

export const AccountInfo:FC<AccountInfoProps> = React.memo(({ type, bank, account }) => {
    return (
       <Typography>
            {billTypesMap[type]} {banksMap[bank]} {getHiddenAccount(account)}
       </Typography>  
    )
})
