import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import {FundResponse} from "../../store/funds/types";

export const fundApi = createApi({
    reducerPath: 'fundAPI',
    baseQuery: fetchBaseQuery(
        { baseUrl: configFile.REACT_APP_BASE_ENDPOINT }),
    tagTypes: ['FundResponse'],
    endpoints: (build ) => ({
        fetchAllFunds: build.query<FundResponse, null>({
            query: () => ({
                url: `/funds`
            }),
            providesTags: result => ['FundResponse']
        })
    })
})
