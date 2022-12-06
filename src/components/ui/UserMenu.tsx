import React, {FC} from 'react';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem'
import Typography from "@mui/material/Typography";

interface UserMenuProps {
    anchor: null | HTMLElement,
    close: () => void
}

export const UserMenu:FC<UserMenuProps> = React.memo(({ anchor, close }) => {
    return (
        <Menu
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={close} >
        
            <MenuList>
                <MenuItem onClick={close}>
                    <Typography textAlign="center">Профиль</Typography>
                </MenuItem>
                <MenuItem onClick={close}>
                    <Typography textAlign="center">Счета</Typography>
                </MenuItem>                        
                <MenuItem onClick={close}>
                    <Typography textAlign="center">Выход</Typography>
                </MenuItem>
            </MenuList>
        </Menu>       
    )
})