import React, {FC, PropsWithChildren, useEffect} from 'react';
import {getAuthId} from "../services/localStorage.service";
import {authActions} from "../store/auth/authSlice";
import {useActions} from "./useActions";
import {useAppDispatch} from "../store";
const AuthProvider:FC<PropsWithChildren> = ({children}) => {

    const {getAuthInfo} = useActions()
    const dispatch = useAppDispatch()
    const authId = getAuthId()

    useEffect(() => {
        if (authId) {
            getAuthInfo(authId)
        } else {
            dispatch(authActions.setLoading(false))
        }
    }, [])


    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;