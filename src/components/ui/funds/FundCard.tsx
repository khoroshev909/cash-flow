import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {FUND_TYPES, IFund} from "../../../store/funds/types";
import Box from "@mui/material/Box";
import {BalanceInfo, AccountInfo, FundTypeIcon} from "../../../components";
import {getBillByIdSelector} from "../../../services/RTK/billApi";
import displayDetails from "../../../utils/displayDetails";
import dayjs from 'dayjs'

interface CardProps {
    fund: IFund
}
export const FundCard:FC<CardProps> = React.memo(({ fund }) => {

    const bill = getBillByIdSelector(fund.bill)

    if (!bill) return <h4>Loading...</h4>

    return (
        <Card sx={{ mb: 2, '&:hover': { cursor: 'pointer' } }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="subtitle2">
                            {dayjs(fund.createdAt).format('DD/MM/YY')}
                        </Typography>

                        <AccountInfo bill={bill} />

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box marginRight={0.5} >
                                <BalanceInfo
                                    variant="h6"
                                    iconSize={16}
                                    balance={fund.amount}
                                    currency={bill.currency!} />
                            </Box>

                            <FundTypeIcon type={fund.type} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {displayDetails(fund.details)}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" marginRight={1}>
                                До:
                            </Typography>
                            <BalanceInfo
                                variant="h6"
                                balance={+(fund.type === FUND_TYPES.INCOM ? fund.balance - fund.amount : fund.balance + fund.amount).toFixed(2)}
                                currency={bill.currency}
                                iconSize={18} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" marginRight={0.5}>
                                После:
                            </Typography>
                            <BalanceInfo
                                variant="h6"
                                balance={+fund.balance.toFixed(2)}
                                currency={bill.currency}
                                iconSize={18} />
                        </Box>

                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
})
