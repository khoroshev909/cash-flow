import React, {FC, useContext} from 'react';
import {Link} from 'react-router-dom';
import {default as MuiLink} from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {BalanceInfo, Title, AccountInfo} from '../../components'  
import dayjs from 'dayjs'
import { CurrentBillContext } from '../pages/HomePage';
import {FUND_TYPES, IFund} from '../../store/funds/types';

interface FundListProps {
  funds: IFund[]
}

export const FundList:FC<FundListProps> = React.memo(({ funds }) => {

  const { current } = useContext(CurrentBillContext)

  const preventDefault = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Title>Последние операции</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Cчёт</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell>Баланс</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funds.map((fund) => (
            <TableRow key={fund._id}>
                <TableCell>
                  <Typography variant="body1">{dayjs(fund.createdAt).format('DD/MM')}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {fund.details.length > 20 ? fund.details.slice(0, 20) + '...' : fund.details}
                  </Typography>
                </TableCell>
                <TableCell>
                  <AccountInfo type={current.type} bank={current.bank} account={current.account} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">{fund.type === FUND_TYPES.INCOM ? '+' : '-'}</Typography>
                    <BalanceInfo balance={fund.amount} currency={current.currency} variant="body1" iconSize={12} />
                  </Box>
                </TableCell>
                <TableCell>
                  <BalanceInfo balance={fund.balance} currency={current.currency} variant="body1" iconSize={12} />
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      <MuiLink color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Смотреть всю историю
      </MuiLink>
    </React.Fragment>
  );
})
