import {RootState} from "../index";
import {IFund} from "./types";

export const fundSelector = () => (state: RootState) => state.funds

export const fundByIdSelector = (fundId: string) => (state: RootState): IFund | null => {
        if (state.funds.funds.length) {
                const data = state.funds.funds.find(f => f._id === fundId)
                if (data) return data
        }
        return null
}