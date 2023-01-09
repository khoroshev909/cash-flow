import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import {IBill} from "../../types/models";
import fetchFn from "./utils/fetchFn";
import transformResponse from "./utils/transformResponse";

export const billApi = createApi({
    reducerPath: 'billAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: configFile.REACT_APP_BASE_ENDPOINT,
        fetchFn,
    }),
    tagTypes: ['Bills'],
    endpoints: (build ) => {
        return {
            fetchAllBills: build.query<IBill[], null>({
                query: () => ({ url: '/bills' }),
                transformResponse,
                providesTags: result => ['Bills']
            }),
            // createPost: build.mutation<IPost[], IPost>({
            //     query: (post) => ({
            //         url: 'posts/',
            //         method: "post",
            //         body: post
            //     }),
            //     invalidatesTags: ['Post']
            // }),
            // updatePost: build.mutation<IPost[], IPost>({
            //     query: (post) => ({
            //         url: 'posts/' + post.id,
            //         method: "put",
            //         body: post
            //     }),
            //     invalidatesTags: ['Post']
            // }),
            // deletePost: build.mutation<IPost[], IPost>({
            //     query: (post) => ({
            //         url: 'posts/' + post.id,
            //         method: "delete"
            //     }),
            //     invalidatesTags: ['Post']
            // })
        }
    }
})

export const getBillByIdSelector = (id: string) => billApi.endpoints.fetchAllBills.useQueryState(null).data?.find(bill => bill._id === id)