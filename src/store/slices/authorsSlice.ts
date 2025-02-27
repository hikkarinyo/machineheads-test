import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Author, AuthorsState } from 'models/Author'


const initialState: AuthorsState = {
    authors: [],
    loading: false,
    error: null,
}

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        fetchAuthorsRequest: (state) => {
            state.loading = true
            state.error = null
        },
        fetchAuthorsSuccess: (state, action: PayloadAction<{ authors: Author[] }>) => {
            state.authors = action.payload.authors
            state.loading = false
        },
        fetchAuthorsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    fetchAuthorsRequest,
    fetchAuthorsSuccess,
    fetchAuthorsFailure,
} = authorsSlice.actions

export default authorsSlice.reducer
