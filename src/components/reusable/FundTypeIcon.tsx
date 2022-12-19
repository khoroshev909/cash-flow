import React, {FC} from 'react';
import {FUND_TYPES} from "../../store/funds/types";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { red, green } from '@mui/material/colors';

interface FundTypeIconProps {
    type: FUND_TYPES
}
export const FundTypeIcon:FC<FundTypeIconProps> = React.memo(({ type }) => {
    return (
        type === FUND_TYPES.INCOM ? (
                <TrendingUpIcon style={{ color: green[700] }} />
            ) : (
                <TrendingDownIcon style={{ color: red[700] }} />
        )
    );
})

