import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Post, PostDetail, PostState } from 'models/Post'

const initialState: PostState = {
    posts: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
    success: false,
    postDetail: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsRequest: (state) => {
            state.loading = true
            state.error = null
        },
        fetchPostsSuccess: (state, action: PayloadAction<{ posts: Post[], currentPage: number, totalPages: number }>) => {
            state.posts = action.payload.posts
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
            state.loading = false
        },
        fetchPostsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        addPostRequest: (state) => {
            state.loading = true
            state.error = null
            state.success = false
        },
        addPostSuccess: (state) => {
            state.loading = false
            state.success = true
        },
        addPostFailure: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
        },
        resetAddPostSuccess: (state) => {
            state.success = false
        },
        fetchPostDetailRequest: (state) => {
            state.error = null
        },
        fetchPostDetailSuccess: (state, action: PayloadAction<PostDetail>) => {
            state.postDetail = action.payload
        },
        fetchPostDetailFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        editPostRequest: (state) => {
            state.loading = true
            state.error = null
            state.success = false
        },
        editPostSuccess: (state) => {
            state.loading = false
            state.success = true
        },
        editPostFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        deletePostRequest: (state) => {
            state.loading = true
            state.error = null
            state.success = false
        },
        deletePostSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false
            state.success = true
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        deletePostFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    fetchPostsSuccess,
    fetchPostsFailure,
    addPostSuccess,
    addPostFailure,
    resetAddPostSuccess,
    editPostFailure,
    editPostSuccess,
    fetchPostDetailSuccess,
    fetchPostDetailFailure,
    deletePostSuccess,
    deletePostFailure,
} = postsSlice.actions
export const fetchPostsRequest = createAction<number>('posts/fetchPostsRequest')
export const fetchPostDetailRequest = createAction<number>('posts/fetchPostDetailRequest')
export const addPostRequest = createAction<FormData>('posts/addPostRequest')
export const editPostRequest = createAction<{ id: number; data: FormData }>('posts/editPostRequest')
export const deletePostRequest = createAction<number>('posts/deletePostRequest')

export default postsSlice.reducer
