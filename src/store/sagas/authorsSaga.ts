import { takeLatest } from 'redux-saga/effects'

import { api } from 'services/apiService'
import { handleApiCall } from 'services/sagaUtils'
import { fetchAuthorsFailure,fetchAuthorsRequest, fetchAuthorsSuccess } from 'store/slices/authorsSlice'


// для получения авторов
function* fetchAuthorsSaga() {
    yield handleApiCall(
        () => api.get('manage/authors'),
        (response: any) => fetchAuthorsSuccess({ authors: response.data }),
        fetchAuthorsFailure,
    )
}


export function* authorsSaga() {
    yield takeLatest(fetchAuthorsRequest.type, fetchAuthorsSaga)
}
