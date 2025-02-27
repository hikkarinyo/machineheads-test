import { message } from 'antd'
import { call, put } from 'redux-saga/effects'

export function* handleApiCall(apiCall: any, successAction: any, failureAction: any, successMessage?: string): any {
    try {
        const response = yield call(apiCall)
        yield put(successAction(response))

        if (successMessage) {
            message.success(successMessage)
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Неизвестная ошибка'
        yield put(failureAction(errorMessage))
        message.error(errorMessage)
    }
}
