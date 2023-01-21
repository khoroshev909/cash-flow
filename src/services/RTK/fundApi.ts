import {IFund} from './../../store/funds/types'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import fetchFn from "./utils/fetchFn";
import localStorageService from "../localStorage.service";
import {BaseQueryArg, BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const fundApi = createApi({
    reducerPath: 'fundAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: configFile.REACT_APP_BASE_ENDPOINT,
        fetchFn
    }),
    tagTypes: ['Funds'],
    endpoints: (build ) => ({
        fetchAllFunds: build.query<IFund[], null>({
            query: () => ({url: '/funds'}),
            transformResponse: (response: BaseQueryResult<any>, meta: BaseQueryMeta<any>): IFund[] => {
                const authId = localStorageService.getAuthId()
                if (!authId) return []
                const transformed: IFund[] = Array.isArray(response) ? response :
                    Object.keys(response).map(key => response[key])
                        .filter(item => item.userId === authId)
                return transformed
            },
            providesTags: result => ['Funds']
        })
    })
})
