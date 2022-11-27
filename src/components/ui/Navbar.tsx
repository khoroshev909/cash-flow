import React from 'react';
import {NavLink} from 'react-router-dom'

export const Navbar = React.memo(() => {

    return (
        <div className="navbar">
            <div className="logo">
                <NavLink to="/" >Cash Flow</NavLink>
            </div>

            <div className="pages">
                <NavLink to="/history" >History</NavLink>
                <NavLink to="/login" >Login</NavLink>
            </div>
        </div>
    );
});

