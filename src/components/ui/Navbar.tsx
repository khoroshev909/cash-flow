import React, {FC} from 'react';
import {Link} from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PaidIcon from '@mui/icons-material/Paid';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu"
import MenuItem from '@mui/material/MenuItem'
import Badge from '@mui/material/Badge'

interface NavbarProps {
    open: boolean,
    openSideBar: () => void
}

const drawerWidth = 240;

export const Navbar:FC<NavbarProps> = React.memo(({openSideBar, open}) => {

    const [anchorElUser, setAnchorElUser] = React.useState<boolean>(false);

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
      }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));

    const handleOpenUserMenu = () => {
        setAnchorElUser(true);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(false);
    }

    const openSideBarHandler = () => {
        openSideBar()
    }

    return (
        <AppBar position="static" >
            <Toolbar>

                {/* бургер */}
                <IconButton
                    onClick={openSideBarHandler}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                        mr: {xs: 1, md: 3},
                        display: { xs: 'block', md: 'none' },
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/* лого */}
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr: 2,
                        textDecoration: 'none',
                    }}>

                    <Link to="/" className="logo">
                    <PaidIcon sx={{
                            display: { xs: 'none', md: 'block' },
                            fontSize: '24px',
                            mr: '4px'}} />
                        Cash Flow
                    </Link>
                </Typography>
                    
                {/* Основное меню */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="menu">
                    <Link to="/history" >Счета</Link>
                    <Link to="/history" >История</Link>
                    <Link to="/example">Дэшборд</Link>
                </Box>

                {/* профиль */}
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }  }}>
                    
                    <Tooltip title="Настройки профиля">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, position: 'relative' }}>
                            <Avatar alt="Username" src="https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk" />
                            <Badge 
                                sx={{
                                    position: 'absolute',
                                    top: '10%',
                                    right: 0
                                }} 
                                badgeContent={17} 
                                color="error" />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        sx={{ mt: '45px'}}
                        anchorEl={null}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={anchorElUser}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Профиль</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Счета</Typography>
                        </MenuItem>                        
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Выход</Typography>
                        </MenuItem>
                    </Menu>

                </Box>
            </Toolbar>
        </AppBar>
    );
});

