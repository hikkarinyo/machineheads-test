import { PayloadAction } from '@reduxjs/toolkit'
import { put, select,takeLatest } from 'redux-saga/effects'

import { api } from 'services/apiService'
import { handleApiCall } from 'services/sagaUtils'
import {
    addPostFailure, addPostRequest, addPostSuccess, deletePostFailure, deletePostRequest, deletePostSuccess,
    editPostFailure, editPostRequest, editPostSuccess,
    fetchPostDetailFailure, fetchPostDetailRequest, fetchPostDetailSuccess,
    fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess,
} from '../slices/postsSlice'



function* fetchPostsSaga(action: PayloadAction<number>) {
    yield handleApiCall(
        () => api.get('/manage/posts/default', { params: { page: action.payload } }),
        (response: any) => fetchPostsSuccess({
            posts: response.data,
            currentPage: action.payload,
            totalPages: parseInt(response.headers['x-pagination-total-count'], 10),
        }),
        fetchPostsFailure,
    )
}

function* addPostSaga(action: ReturnType<typeof addPostRequest>): any {
    const currentPage = yield select((state) => state.posts.currentPage)

    yield handleApiCall(
        () => api.post('manage/posts/add', action.payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
        () => {
            return addPostSuccess()
        },
        addPostFailure,
        'Пост успешно добавлен!',
    )
    yield put(fetchPostsRequest(currentPage))
}

function* editPostSaga(action: PayloadAction<{ id: number; data: FormData }>): any {
    const currentPage = yield select((state) => state.posts.currentPage)

    yield handleApiCall(
        () => api.post(`/manage/posts/edit?id=${action.payload.id}`, action.payload.data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
        () => {
            return editPostSuccess()
        },
        editPostFailure,
        'Пост успешно обновлен!',
    )
    yield put(fetchPostsRequest(currentPage))
}

function* fetchPostDetailSaga(action: ReturnType<typeof fetchPostDetailRequest>) {
    yield handleApiCall(
        () => api.get(`/manage/posts/detail?id=${action.payload}`),
        (response: any) => fetchPostDetailSuccess(response.data),
        fetchPostDetailFailure,
    )
}

function* deletePostSaga(action: PayloadAction<number>): any {
    const currentPage = yield select((state) => state.posts.currentPage)

    yield handleApiCall(
        () => api.delete(`/manage/posts/remove?id=${action.payload}`),
        () => put(deletePostSuccess(action.payload)),
        deletePostFailure,
        'Пост успешно удален!',
    )
    yield put(fetchPostsRequest(currentPage))
}

export function* postsSaga() {
    yield takeLatest(fetchPostsRequest.type, fetchPostsSaga)
    yield takeLatest(fetchPostDetailRequest.type, fetchPostDetailSaga)
    yield takeLatest(addPostRequest.type, addPostSaga)
    yield takeLatest(editPostRequest.type, editPostSaga)
    yield takeLatest(deletePostRequest.type, deletePostSaga)
}
