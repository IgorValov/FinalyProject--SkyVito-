import axios from 'axios'

export const API_URL = 'http://localhost:8090'

const $api = axios.create({
  baseURL: API_URL
})

export const $fileUpload = axios.create({
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

$fileUpload.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'multipart/form-data'
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

const updateToken = async (error, axiosInstance) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config.isRetry) {
    originalRequest.isRetry = true
    try {
      const response = await axios.put(`${API_URL}/auth/login/`, {
        access_token: localStorage.getItem('accessToken'),
        refresh_token: localStorage.getItem('refreshToken')
      })
      localStorage.setItem('accessToken', response.data.access_token)
      localStorage.setItem('refreshToken', response.data.refresh_token)
      return axiosInstance.request(originalRequest)
    } catch (e) {
      console.log('Пользователь не авторизован')
    }
  }
  throw error
}

$api.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => updateToken(error, $api)
)

$fileUpload.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => updateToken(error, $fileUpload)
)

export default $api
