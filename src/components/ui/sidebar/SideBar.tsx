import React, {FC} from 'react';
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';

interface SideBarProps {
    open: boolean,
    closeSideBar: () => void
}

const SideBar:FC<SideBarProps> = React.memo(({closeSideBar, open}) => {

    const closeSideBarHandler = () => {
        closeSideBar()
    }

    return (
        <Drawer variant="temporary" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}>
                <IconButton onClick={closeSideBarHandler}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
            </List>
      </Drawer>
    );
})
 
export default SideBar;