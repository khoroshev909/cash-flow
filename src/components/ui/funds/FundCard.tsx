import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {IFund} from "../../../store/funds/types";
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
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {displayDetails(fund.details)}
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


                    <Box>
                        <Typography variant="body2">
                            {dayjs(fund.createdAt).format('DD/MM/YY')}
                        </Typography>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
})
