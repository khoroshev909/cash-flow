import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface MenuButtonProps {
    isOpen: boolean,
    openSidebar: () => void
}

export const MenuButton:FC<MenuButtonProps> = React.memo(({ isOpen, openSidebar }) => {
    return (
        <IconButton
        onClick={openSidebar}
        edge="start"
        color="inherit"
        aria-label="Боковое меню"
        sx={{
            mr: {xs: 1, md: 3},
            display: { xs: 'block', md: 'none' },
            ...(isOpen && { display: 'none' }),
        }}>
            <MenuIcon />
        </IconButton>   
    );
})
 