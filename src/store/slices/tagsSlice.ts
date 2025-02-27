import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tag, TagState } from 'models/Tag'


const initialState: TagState = {
    tags: [],
    loading: false,
    error: null,
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        fetchTagsRequest: (state) => {
            state.loading = true
            state.error = null
        },
        fetchTagsSuccess: (state, action: PayloadAction<{ tags: Tag[] }>) => {
            state.tags = action.payload.tags
            state.loading = false
        },
        fetchTagsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    fetchTagsSuccess,
    fetchTagsFailure,
    fetchTagsRequest,
} = tagsSlice.actions

export default tagsSlice.reducer
