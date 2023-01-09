import {PayloadAction} from '@reduxjs/toolkit'
import {IUser, UserData} from './../../types/models'
import {getAuthInfo} from './asyncActions'
import {createSlice} from '@reduxjs/toolkit'

interface AuthState {
    loading: boolean,
    logged: boolean,
    error: string | null,
    authId: string | null,
    info: UserData | null
}

const initialState: AuthState = {
    loading: true,
    logged: false,
    error: null,
    authId: null, // 'E3ZH4sl98Nc03iCySXpK'
    info: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserData>) {
            state.loading = true
            state.authId = action.payload._id
            state.info = action.payload
            state.logged = true
            state.loading = false
        },
        logOut(state) {
            state.loading = true
            state.authId = null
            state.info = null
            state.logged = false
            state.loading = false
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthInfo.pending.type, (state) => {
            state.loading = true
            state.info = null
        })
        builder.addCase(getAuthInfo.fulfilled.type, (state, action: PayloadAction<IUser>) => {
            const {email, avatar, username, _id} = action.payload
            state.info = {email, avatar, username, _id}
            state.authId = _id
            state.logged = true
            state.loading = false
        })
        builder.addCase(getAuthInfo.rejected.type, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export const { reducer: authReducer, actions: authActions } = authSlice
export default authReducer