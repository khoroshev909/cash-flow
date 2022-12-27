import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useActions} from "../../../hooks/useActions";
import {getAuthId} from "../../../services/localStorage.service";
import {useAppDispatch, useAppSelector} from "../../../store";
import {getAuthInfo} from "../../../store/auth/asyncActions";
import {authActions} from "../../../store/auth/authSlice";
import {isLoggedInSelector} from "../../../store/auth/selectors";

const AppLoader:FC<PropsWithChildren> = ({ children }) => {

    const authId = getAuthId()
    const isLogged = useAppSelector(isLoggedInSelector())
    const dispatch = useAppDispatch()
    const {getAuthInfo} = useActions()

    const { loading } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!isLogged && authId) {
            getAuthInfo(authId)
        } else {
            dispatch(authActions.setLoading(false))
        }
    }, [isLogged, authId])

    return (
        <>
            {loading ? <h4>Loading...</h4> : children}
        </>
    );
};

export default AppLoader;