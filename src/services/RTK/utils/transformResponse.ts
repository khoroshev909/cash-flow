import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import localStorageService from "../../localStorage.service";
const transformResponse = <T extends {userId: string}>(response: {[key: string]: T}, meta: any, args: any): T[] => {
    const authId = localStorageService.getAuthId()
    if (!authId) return []
    const transformed: T[] = Array.isArray(response) ? response : Object.keys(response).map(key => response[key])
    return transformed.filter(item => item.userId === authId)
}
export default transformResponse