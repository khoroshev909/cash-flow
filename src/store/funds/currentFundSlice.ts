import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FundFullInfo, FundFullInfoResponse} from "./types";
import {getFundFullInfo} from "./asyncActions";

const initialState: FundFullInfo = {
    loading: true,
    fund: null,
    error: null,
    creator: null,
    reviewers: [],
    bill: null,
    billOwner: null,
    comments: []
}

const currentFundSlice = createSlice({
    name: 'getFundFullInfo',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.fund = null
            state.loading = false
}
    },
    extraReducers: (builder) => {
        builder.addCase(getFundFullInfo.pending.type, (state) => {
            state.loading = true
            state.error = null
            state.fund = null
            state.creator = null
            state.reviewers = []
            state.bill = null
            state.billOwner = null
            state.comments = []
        })
        builder.addCase(getFundFullInfo.fulfilled.type, (state, action: PayloadAction<FundFullInfoResponse>) => {
            state.fund = action.payload.fund
            state.creator = action.payload.creator
            state.reviewers = action.payload.reviewers
            state.bill = action.payload.bill
            state.billOwner = action.payload.billOwner
            state.comments = action.payload.comments
            state.error = null
            state.loading = false
        })
        builder.addCase(getFundFullInfo.rejected.type, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        })
    }
    // extraReducers: {
    //     [getFunds.pending.type]: (state) => {
    //         state.loading = true
    //         state.funds = []
    //         state.error = null
    //     },
    //     [getFunds.fulfilled.type]: (state, action: PayloadAction<FundResponse>) => {
    //         state.funds = action.payload.items
    //         state.error = null
    //         state.loading = false
    //     },
    //     [getFunds.rejected.type]: (state, action: PayloadAction<string>) => {
    //         state.error = action.payload
    //         state.loading = false
    //     }
    // }
})
const {reducer: currentFundReducer} = currentFundSlice

export const currentSliceActions =  {...currentFundSlice.actions}

export default currentFundReducer
