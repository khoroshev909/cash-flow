import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import configFile from '../../config'
import {IBill} from "../../types/models";

export const billApi = createApi({
    reducerPath: 'billAPI',
    baseQuery: fetchBaseQuery(
        { baseUrl: configFile.REACT_APP_BASE_ENDPOINT }),
    // tagTypes: ['Post'],
    endpoints: (build ) => ({
        fetchAllBills: build.query<IBill[], { limit: number, page: number }>({
            query: ({limit = 5, page = 1}) => ({
                url: '/bills',
                params: {
                    limit: limit,
                    page: page
                }
            }),
            // providesTags: result => ['Post']
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
    })
})