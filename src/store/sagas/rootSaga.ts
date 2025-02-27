import { all } from 'redux-saga/effects'

import { authorsSaga } from 'store/sagas/authorsSaga'
import { authSaga } from 'store/sagas/authSaga'
import { postsSaga } from 'store/sagas/postsSaga'
import { tagsSaga } from 'store/sagas/tagsSaga'

export function* rootSaga() {
    yield all([
        authSaga(),
        postsSaga(),
        tagsSaga(),
        authorsSaga(),
    ])
}
