import httpService from "./http.service";
import {FundResponse} from "../types";

const fundService = {
    get: async () => {
        try {
            const response = await httpService.get<FundResponse>('/funds')
            const {data} = response
            return data
        } catch (error: any) {
            return error
        }
    }
}

export default fundService