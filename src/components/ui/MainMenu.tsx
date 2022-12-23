import React from 'react';
import {Link} from 'react-router-dom'
import Box from "@mui/material/Box";

export const MainMenu = React.memo(() => {
    return (
        <Box sx={{mr: 2}} className="menu">
            <Link to="/funds" >История</Link>
        </Box>
    )
})