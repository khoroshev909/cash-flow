import React, {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import {isLoggedInSelector} from '../../store/auth/selectors';

interface ProtectedRouteProps {
    route: React.ReactElement,
    redirectTo?: string
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({ route, redirectTo }) => {

    const location = useLocation()
    const isLoggedIn = useSelector(isLoggedInSelector())

    if (!isLoggedIn) {
        return (
            <Navigate
                to={redirectTo ? redirectTo : "/login"}
                state={{ referrer: location }} />
        )
    } 

    return route

/*    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/auth/login",
                                state: {
                                    referrer: props.location,
                                },
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );*/
}

export default ProtectedRoute;