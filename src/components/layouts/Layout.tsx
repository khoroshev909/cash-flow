import React, {FC, useState} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {Navbar} from "../ui/Navbar";
import SideBar from "../ui/sidebar/SideBar"

interface LayoutProps {
    children: React.ReactNode
};

const Layout:FC<LayoutProps> = ({children}) => {

    const [open, setOpen] = useState<boolean>(false);
  
    const closeSideBarHandler = () => {
        setOpen(false)
    };

    const openSideBarHandler = () => {
        setOpen(true)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            color: 'primary.main'
        }}>
            <CssBaseline />
            <Navbar 
                open={open}
                openSideBar={openSideBarHandler} />
            <SideBar
                open={open}
                closeSideBar={closeSideBarHandler} />
            <Container maxWidth="xl">
                {children}
            </Container>
        </Box>
    );
};

export default Layout;