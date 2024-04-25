import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export function setDefaultToken(token: string) {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common.Authorization
  }
}

axiosInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        window.location.href = '/login'
      }
    } else if (error.request) {
      console.log('Conexão falhou!')
    } else {
      console.log('Error', error.message)
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
