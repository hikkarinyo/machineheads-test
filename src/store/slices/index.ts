import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import authorsReducer from 'store/slices/authorsSlice'
import authReducer from 'store/slices/authSlice'
import postsReducer from 'store/slices/postsSlice'
import tagsReducer from 'store/slices/tagsSlice'


const createRootReducer = (history: History<unknown>) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    posts: postsReducer,
    tags: tagsReducer,
    authors: authorsReducer,
})

export default createRootReducer
