import Cookies from 'js-cookie'
import { call, put, takeEvery } from 'redux-saga/effects'

import { loginRequest, refreshTokenRequest } from 'services/apiService'
import {
    login, loginFailure, loginSuccess,
    refreshTokenFailure, refreshTokenSuccess,
} from 'store/slices/authSlice'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

function* loginSaga(action: ReturnType<typeof login>): any {
    try {
        const { email, password } = action.payload
        const response = yield call(loginRequest, email, password)
        const { access_token, refresh_token } = response.data

        const accessToken = access_token
        const refreshToken = refresh_token

        Cookies.set(ACCESS_TOKEN_KEY, accessToken, { path: '/' })
        Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { path: '/' })

        yield put(loginSuccess({ accessToken, refreshToken }))
    } catch (error: any) {
        yield put(loginFailure(error.response?.data?.message))
    }
}

function* refreshTokenSaga(): any {
    try {
        const oldRefreshToken = Cookies.get(REFRESH_TOKEN_KEY)
        if (!oldRefreshToken) return

        const response = yield call(refreshTokenRequest, oldRefreshToken)
        const { access_token, refresh_token: newRefreshToken } = response.data

        const accessToken = access_token
        const refreshToken = newRefreshToken

        Cookies.set(ACCESS_TOKEN_KEY, accessToken, { path: '/' })
        Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { path: '/' })

        yield put(refreshTokenSuccess({ accessToken, refreshToken }))
    } catch (error: any) {
        yield put(refreshTokenFailure(error.response?.data?.message))
    }
}

export function* authSaga() {
    yield takeEvery(login.type, loginSaga)
    yield takeEvery('auth/refreshToken', refreshTokenSaga)
}
