import axios from "axios"
import {removeTokens, setTokens} from "./localStorage.service";
import {Dispatch} from "@reduxjs/toolkit";
import {authActions} from "../store/auth/authSlice";
import {userService} from "./user.service";

const authConfig = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: 'AIzaSyAfeiVrkuqPjVGU4Y_7-D36SsapK0inC8Y'
    }
})

interface AuthPayload {
    email: string,
    password: string
}

export interface AuthResponse {
    localId: string,
    idToken: string,
    refreshToken: string,
    expiresIn: number
}

export const login = ({ email, password }: AuthPayload) => async (dispatch: Dispatch) => {
    try {
        const { data } = await authConfig.post<AuthResponse>('accounts:signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        })
        setTokens({ ...data, expiresIn: Date.now() + data.expiresIn * 1000 })
        const { avatar, username, _id } = await userService.fetchById(data.localId)
        dispatch(authActions.login({ avatar, username, _id, email }))
    } catch (error: any) {
        console.log(error)
    }
}

export const logout = () => (dispatch: Dispatch) => {
    removeTokens()
    dispatch(authActions.logOut())
}

const authService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default authService