import React, {FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../../store/auth/selectors";

interface GusetRouteProps {
    route: React.ReactElement,
    redirectTo?: string
}
const GuestRoute:FC<GusetRouteProps> = ({ route, redirectTo }) => {

    const location = useLocation()
    const isLoggedIn = useSelector(isLoggedInSelector())

    if (isLoggedIn) {
        return (
            <Navigate
                to={redirectTo ? redirectTo : "/"}
                state={{ referrer: location }} />
        )
    }

    return route
};

export default GuestRoute;