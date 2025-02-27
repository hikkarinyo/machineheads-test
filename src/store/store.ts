import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from 'store/sagas/rootSaga'
import createRootReducer from 'store/slices'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()


const store = configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
