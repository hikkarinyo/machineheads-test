import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'https://rest-test.machineheads.ru/'
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const TOKEN_PATH = '/'

// Создаем экземпляр axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Интерсептор для добавления токена в заголовки
api.interceptors.request.use((config) => {
    const token = Cookies.get(ACCESS_TOKEN_KEY)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Интерсептор для обработки ошибки 401 и обновления токенов
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refresh_token = Cookies.get(REFRESH_TOKEN_KEY)
                if (!refresh_token) throw new Error('Токен обновления недоступен')

                const formData = new FormData()
                formData.append('refresh_token', refresh_token)

                const response = await axios.post(`${API_URL}auth/token-refresh`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })

                const { access_token, refresh_token: newRefreshToken } = response.data

                Cookies.set(ACCESS_TOKEN_KEY, access_token, { path: TOKEN_PATH })
                Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken, { path: TOKEN_PATH })

                originalRequest.headers['Authorization'] = `Bearer ${access_token}`
                return api(originalRequest)
            } catch (error) {
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    },
)


export const loginRequest = async (email: string, password: string) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    return await api.post('auth/token-generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export const refreshTokenRequest = async (refresh_token: string) => {
    return await api.post('auth/token-refresh', { refresh_token })
}

export { api }
