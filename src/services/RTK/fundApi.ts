import { IFund } from './../../store/funds/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import {FundResponse} from "../../store/funds/types";

export const fundApi = createApi({
    reducerPath: 'fundAPI',
    baseQuery: fetchBaseQuery(
        { baseUrl: configFile.REACT_APP_BASE_ENDPOINT }),
    tagTypes: ['Funds'],
    endpoints: (build ) => ({
        fetchAllFunds: build.query<IFund[], null>({
            query: () => ({
                url: `/funds`
            }),
            providesTags: result => ['Funds']
        })
    })
})
