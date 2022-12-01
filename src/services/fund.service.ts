import httpService from "./http.service";
import {FundResponse, IFund} from "../store/funds/types";

export const fundService = {
    fetchAll: async () => {
        try {
            const response = await httpService.get<FundResponse>('/funds')
            const {data} = response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    },
    fetchById: async (fundId: string) => {
        try {
            const response = await httpService.get<IFund>(`/funds/${fundId}`)
            const {data} = response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }
}