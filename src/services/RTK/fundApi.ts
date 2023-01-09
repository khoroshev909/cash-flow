import {IFund} from './../../store/funds/types'
import transformResponse from "./utils/transformResponse";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import fetchFn from "./utils/fetchFn";

export const fundApi = createApi({
    reducerPath: 'fundAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: configFile.REACT_APP_BASE_ENDPOINT,
        fetchFn
    }),
    tagTypes: ['Funds'],
    endpoints: (build ) => ({
        fetchAllFunds: build.query<IFund[], null>({
            query: () => ({ url: '/funds' }),
            transformResponse,
            providesTags: result => ['Funds']
        })
    })
})
