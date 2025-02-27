import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    error?: string | null
    isLoading?: boolean
    isAuthenticated?: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    error: null,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoading = true
            state.error = null
            state.refreshToken = null
            state.accessToken = null
            state.isAuthenticated = false
        },
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.error = null
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.accessToken = null
            state.refreshToken = null
        },
        refreshTokenSuccess: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        refreshTokenFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    },
})

export const { loginSuccess, loginFailure, logout, refreshTokenSuccess, refreshTokenFailure } = authSlice.actions
export const login = createAction<{ email: string; password: string }>('auth/login')
export default authSlice.reducer
