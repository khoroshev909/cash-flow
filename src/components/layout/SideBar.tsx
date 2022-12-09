import React, {FC} from 'react';
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {SideBarMenu} from '../../components'


interface SideBarProps {
    isOpen: boolean,
    close: () => void
}

export const SideBar:FC<SideBarProps> = React.memo(({close, isOpen}) => {
    return (
        <Drawer variant="temporary" open={isOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}>
                <IconButton onClick={close}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <SideBarMenu />
      </Drawer>
    );
})
 