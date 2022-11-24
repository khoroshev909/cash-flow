import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFund} from "../../types";

/// <reference path="../../types/index.ts" />

interface InitialProps {
    loading: boolean,
    funds: IFund[],
    current: IFund | null,
    error: null | string
}

const initialState: InitialProps = {
    loading: true,
    funds: [],
    current: null,
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
        fundsGetError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        fundsResetError(state) {
            state.error = null
        },
        fundsFetchData(state, action: PayloadAction<IFund[]>) {
            state.funds = action.payload
            state.error = null
        },
        fundsGetCurrent(state, action: PayloadAction<IFund>) {
            state.current = action.payload
        }
    }
})
const {reducer: fundReducer, actions} = fundSlice

export const {
    fundsLoadingOn,
    fundsLoadingOff,
    fundsGetError,
    fundsResetError,
    fundsFetchData,
    fundsGetCurrent
} = actions

export default fundReducer
