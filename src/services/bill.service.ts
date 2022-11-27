import httpService from "./http.service";
import {IBill} from "../types/models";

export const billService = {
    fetchById: async (billId: string):Promise<IBill> => {
        try {
            const response = await httpService.get<IBill>(`/bills/${billId}`)
            const {data} = response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }
}
