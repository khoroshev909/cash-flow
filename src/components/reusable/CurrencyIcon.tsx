import React, {FC} from 'react';
import {CURRENCY_CODE} from '../../types/models'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface CurrencyIconProps {
    code: CURRENCY_CODE,
    size: number
}

export const CurrencyIcon:FC<CurrencyIconProps> = React.memo(({code, size}) => {

    let Icon = AttachMoneyIcon

    if (code === 'RUB')  Icon = CurrencyRubleIcon
    if (code === 'EUR')  Icon = EuroIcon
    if (code === 'USD')  Icon = AttachMoneyIcon

    return (
        <Icon style={{height: `${size}px`, width: `${size}px`}} />
    )
})
