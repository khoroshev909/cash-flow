import axios from "axios"
import {removeTokens, setTokens} from "./localStorage.service";
import {Dispatch} from "@reduxjs/toolkit";
import {authActions} from "../store/auth/authSlice";
import {userService} from "./user.service";

const authService = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: 'AIzaSyAfeiVrkuqPjVGU4Y_7-D36SsapK0inC8Y'
    }
})

interface SignUpPayload {
    email: string,
    password: string,
    username: string
}

interface LoginPayload {
    email: string,
    password: string
}

export interface AuthResponse {
    localId: string,
    idToken: string,
    refreshToken: string,
    expiresIn: number
}

export const login = ({ email, password }: LoginPayload) => async (dispatch: Dispatch) => {
    try {
        const { data } = await authService.post<AuthResponse>('accounts:signInWithPassword', {
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

export const signUp = ({ email, password, username }: SignUpPayload) => async (dispatch: Dispatch) => {
    try {
        const { data } = await authService.post<AuthResponse>('accounts:signUp', {
            email,
            password,
            returnSecureToken: true
        })
        setTokens({ ...data, expiresIn: Date.now() + data.expiresIn * 1000 })
        const { localId: _id } = data
        const avatar = 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1073.jpg'
        await userService.create({
            _id,
            email,
            username,
            avatar,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        dispatch(authActions.login({ avatar, username, _id, email }))
    } catch (error: any) {
        console.log(error)
    }
}
//test@example.com
export const logout = () => (dispatch: Dispatch) => {
    removeTokens()
    dispatch(authActions.logOut())
}
export default authService