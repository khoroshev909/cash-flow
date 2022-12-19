import React, {FC, useState, MouseEvent} from 'react';
import {Link} from 'react-router-dom'
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {UserData} from '../../types/models';
import MuiAppBar from '@mui/material/AppBar';
import {MenuButton, Logo, MainMenu, Avatar, UserMenu} from '../../components';

interface HeaderProps {
    isOpenSidebar: boolean,
    openSideBar: () => void,
    isLogged: boolean,
    userData: UserData | null
}

export const Header:FC<HeaderProps> = React.memo(({isOpenSidebar, openSideBar, isLogged, userData}) => {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    return (
        <MuiAppBar position="static" >
            <Toolbar sx={{justifyContent: 'space-between'}}>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {isLogged && (
                        <MenuButton 
                            isOpen={isOpenSidebar} 
                            openSidebar={openSideBar} /> 
                    )}
                    <Logo />
                </Box>

                {isLogged ? (
                    <Box sx={{ 
                        flexGrow: 0,
                        alignItems: 'center',
                        display: { xs: 'none', md: 'flex' }
                    }}>
                        <Link to="/login" >Вход</Link>
                        <Link to="/signup" >Регистрация</Link>
                        <MainMenu />
                        <Avatar 
                            data={userData} 
                            open={handleOpenUserMenu} />
                        <UserMenu
                            anchor={anchorElUser}
                            close={handleCloseUserMenu} />
                    </Box>
                ) : (
                    <Box sx={{mr: 2}} className="menu">
                        <Link to="/login" >Вход</Link>
                        <Link to="/signup" >Регистрация</Link>
                    </Box>                    
                )}

            </Toolbar>
        </MuiAppBar>
    );
});

