import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFund} from "./types";

/// <reference path="./types.ts" />

interface InitialProps {
    loading: boolean,
    funds: IFund[],
    error: null | string
}

const initialState: InitialProps = {
    loading: true,
    funds: [],
    error: null
}

const fundSlice = createSlice({
    name: 'funds',
    initialState,
    reducers: {
        fundsLoadingOn(state) {
            state.loading = true
        },
        fundsLoadingOff(state) {
            state.loading = false
        },
        fundSetError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        fundsResetError(state) {
            state.error = null
        },
        fundsSetData(state, action: PayloadAction<IFund[]>) {
            state.funds = action.payload
            state.error = null
        }
    }
})
const {reducer: fundReducer, actions} = fundSlice

export const {
    fundsLoadingOn,
    fundsLoadingOff,
    fundSetError,
    fundsResetError,
    fundsSetData,
} = actions

export default fundReducer
