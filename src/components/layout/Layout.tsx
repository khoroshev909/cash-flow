import React, {FC, useState, useEffect} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {Header} from "./Header";
import {SideBar} from "./SideBar"
import {Footer} from './Footer'
import {useAppSelector} from '../../store'
import {isLoggedInSelector} from '../../store/auth/selectors'
import errorDisplay from '../../utils/errorDisplay'

interface LayoutProps {
    children: React.ReactNode
};

const Layout:FC<LayoutProps> = React.memo(({children}) => {

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const isLogged = useAppSelector(isLoggedInSelector())

    const {loading, info: userData, error} = useAppSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            errorDisplay(error)
        }
    }, [error])

    if (loading) {
      return <h4>Loading...</h4>
    }

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            color: 'primary.main'
        }}>
            <CssBaseline />
            <Header 
                isOpenSidebar={isOpenSidebar}
                openSideBar={() => setIsOpenSidebar(true)}
                isLogged={isLogged}
                userData={userData} />
            <SideBar
                isOpen={isOpenSidebar}
                close={() => setIsOpenSidebar(false)} />
            <Container
                maxWidth="xl"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginY: 4
            }}>
                {children}
                <Footer />
            </Container>
        </Box>
    );
})

export default Layout;