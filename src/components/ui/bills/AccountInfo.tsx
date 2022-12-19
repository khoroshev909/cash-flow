import React, {FC} from 'react';
import Typography from '@mui/material/Typography';
import {banksMap, billTypesMap, IBill} from '../../../types/models'
import getHiddenAccount from '../../../utils/getHiddenAccount'
import getAccountType from "../../../utils/getAccountType";

interface AccountInfoProps {
    bill: IBill
}

export const AccountInfo:FC<AccountInfoProps> = React.memo(({ bill }) => {
    return (
       <Typography>
            {getAccountType(bill.type)} {banksMap[bill.bank]} {getHiddenAccount(bill.account)}
       </Typography>  
    )
})
