import { userService } from './../../services/user.service'
import { IUser } from './../../types/models'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAuthInfo = createAsyncThunk<IUser, string>( 'users/getAuthInfo',
    async (authId, thunkAPI) => {     
    try {
        const data = await userService.fetchById(authId)
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
    }
})