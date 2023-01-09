import httpService from "./http.service";
import {IUser} from "../types/models";

export const userService = {
    create: async (payload: IUser) => {
        try {
            const response = await httpService.put(`/users/${payload._id}`, payload)
            const {data} = response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    },
    fetchById: async (userId: string) => {
        try {
            const response = await httpService.get<IUser>(`/users/${userId}`)
            const {data} = response
            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }
}
