import { PayloadAction } from '@reduxjs/toolkit'
import { IUser, UserData } from './../../types/models'
import { getAuthInfo } from './asyncActions'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    loading: boolean,
    logged: boolean,
    error: string | null,
    authId: string | null,
    info: UserData | null
}

const initialState: AuthState = {
    loading: false,
    logged: true,
    error: null,
    authId: 'E3ZH4sl98Nc03iCySXpK',
    info: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAuthInfo.pending.type, (state) => {
            state.loading = true
            state.info = null
        })
        builder.addCase(getAuthInfo.fulfilled.type, (state, action: PayloadAction<IUser>) => {
            const {email, avatar, username, _id} = action.payload
            state.info = {email, avatar, username, _id} 
            state.loading = false
        })
        builder.addCase(getAuthInfo.rejected.type, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

const {reducer: authReducer} = authSlice

export default authReducer