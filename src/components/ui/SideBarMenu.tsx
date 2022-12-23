import React, {FC} from 'react';
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

export const SideBarMenu:FC = React.memo(() => {
    return (
        <List component="nav">
            <ListItemButton>
                <ListItemIcon>
                    <FormatListBulletedRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="История" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Профиль" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Выход" />
            </ListItemButton>
        </List>       
    )
})