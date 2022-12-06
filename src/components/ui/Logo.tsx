import React, {FC} from 'react';
import {Link} from 'react-router-dom'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PaidIcon from '@mui/icons-material/Paid';

export const Logo:FC = React.memo(() => {
    return (
        <Link to="/" style={{color: '#fff'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <PaidIcon sx={{
                display: { xs: 'none', md: 'block' },
                fontSize: '32px',
                mr: '6px'}} />
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6" sx={{mb: 0,  lineHeight: 1}}>
                    Cash Flow
                </Typography>
                <Typography variant="caption">
                    Учёт расходов и доходов
                </Typography>
            </Box>
        </Box>
    </Link>
    )
})
 