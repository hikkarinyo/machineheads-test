import { takeLatest } from 'redux-saga/effects'

import { api } from 'services/apiService'
import {handleApiCall} from 'services/sagaUtils'
import { fetchTagsFailure, fetchTagsRequest, fetchTagsSuccess } from 'store/slices/tagsSlice'


// для получения тегов
function* fetchTagsSaga() {
    yield handleApiCall(
        () => api.get('manage/tags'),
        (response: any) => fetchTagsSuccess({ tags: response.data }),
        fetchTagsFailure,
    )
}

export function* tagsSaga() {
    yield takeLatest(fetchTagsRequest.type, fetchTagsSaga)
}
