import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Box from "@mui/material/Box";
import {default as MuiLink} from "@mui/material/Link";
import {useAppDispatch} from "../../store";
import {logout} from "../../services/auth.service";

export const MainMenu = React.memo(() => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        const isOut = window.confirm('Выйти из системы?')
        if (isOut) {
            dispatch(logout())
            navigate('/login')
        }
    }

    return (
        <Box sx={{mr: 2}} className="menu">
            <Link to="/funds" >История</Link>
            <MuiLink
                sx={{ ':hover': { cursor: 'pointer', textDecoration: 'none' }}}
                onClick={logoutHandler}>
                Выход
            </MuiLink>
        </Box>
    )
})