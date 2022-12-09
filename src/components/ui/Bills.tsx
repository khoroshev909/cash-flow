import React,{FC, useContext} from 'react';
import Box from "@mui/material/Box";
import {IBill} from '../../types/models';
import Link from '@mui/material/Link';
import {Title, BalanceInfo, AccountInfo, SelectBill} from '../../components';
import { CurrentBillContext } from '../pages/HomePage';

interface BillsProps {
  data: IBill[]
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const Bills:FC<BillsProps> = React.memo(({ data }) => {

  const { current } = useContext(CurrentBillContext)

  return (
    current ? (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          <Title>Счета</Title>
          <SelectBill bills={data} current={current} />
          <BalanceInfo
            variant="h4"
            iconSize={30}
            balance={current.balance} 
            currency={current.currency} />
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              Снять/Пополнить
            </Link>
          </div>
        </Box>
      ) : (
        <Box>
            <Title>Добавьте ваш первый счёт</Title>
        </Box>
      )
  )
})
