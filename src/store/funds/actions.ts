import {AppDispatch, RootState} from "../index";
import {fundsLoadingOn, fundsLoadingOff, fundsGetError, fundsFetchData, fundsGetCurrent} from "./fundSlice";
import fundService from "../../services/fund.service";

export const fetchFunds = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fundsLoadingOn())
        const { items, count } = await fundService.get()
        dispatch(fundsFetchData(items))
    } catch (error: any) {
        dispatch(fundsGetError(error.message))
    } finally {
        dispatch(fundsLoadingOff())
    }
}

export const getFundById = (fundId: string) => async (dispatch: AppDispatch, getState: () =>  RootState) => {
    dispatch(fundsLoadingOn())
    const state = getState()
    if (state.funds.funds.length) {
        const fund = state.funds.funds.find(f => f._id === fundId)
        if (fund) {
            dispatch(fundsGetCurrent(fund))
        } else {
            dispatch(fundsGetError('Этот расход/приход не найден'))
        }
        dispatch(fundsLoadingOff())
    }
}
