import {billService, commentService, fundService, userService} from "../../services";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FundFullInfoResponse, IFund} from "./types";
import {IComment, IUser} from "../../types/models";

export const getFunds = createAsyncThunk<IFund[]>( 'funds/getFunds',
    async (_, thunkAPI) => {
    try {
        const data = await fundService.fetchAll()
        return data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
    }
})

export const getFundFullInfo = createAsyncThunk<FundFullInfoResponse, IFund>( 'currentFund/getFundFullInfo',
    async (fund, thunkAPI) => {
        try {
            const reviewers: IUser[] = []
            const comments: IComment[] = []
            const creator = await userService.fetchById(fund.creator)
            for (let i = 0; i < fund.reviewers.length; i++) {
                const reviewer = await userService.fetchById(fund.reviewers[i])
                reviewers.push(reviewer)
            }
            const bill = await billService.fetchById(fund.bill)
            const billOwner = [...reviewers, creator].find((user) => user._id === bill.userId) as IUser
            for (let i = 0; i < fund.comments.length; i++) {
                const comment = await commentService.fetchById(fund.comments[i])
                comments.push(comment)
            }
            return {
                fund,
                creator,
                reviewers,
                bill,
                billOwner,
                comments
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
        }
    })


