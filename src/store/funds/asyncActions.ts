import {AppDispatch} from "../index";
import {fundService} from "../../services";
import {
    fundsLoadingOn,
    fundsLoadingOff,
    fundSetError,
    fundsSetData
} from "./fundSlice";

export const fetchFunds = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fundsLoadingOn())
        const { items, count } = await fundService.fetchAll()
        dispatch(fundsSetData(items))
    } catch (error: any) {
        dispatch(fundSetError(error.message || 'Something went wrong'))
    } finally {
        dispatch(fundsLoadingOff())
    }
}

export const fetchFundById = (fundId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fundsLoadingOn())
        const data = await fundService.fetchById(fundId)
        return data
    } catch (error: any) {
        dispatch(fundSetError(error.message || 'Something went wrong'))
    } finally {
        dispatch(fundsLoadingOff())
    }
}
