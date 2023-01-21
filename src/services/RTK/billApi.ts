import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import {IBill} from "../../types/models";
import fetchFn from "./utils/fetchFn";
import {BaseQueryArg, BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import localStorageService from "../localStorage.service";

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
                transformResponse: (response: BaseQueryResult<any>, meta: BaseQueryMeta<any>, args: BaseQueryArg<any>): IBill[] => {
                    const authId = localStorageService.getAuthId()
                    if (!authId) return []
                    const transformed: IBill[] = Array.isArray(response) ? response : Object.keys(response).map(key => response[key])
                    return transformed.filter(item => item.userId === authId)
                },
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