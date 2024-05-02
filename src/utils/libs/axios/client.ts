import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export function setDefaultToken(token: string | any) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
}

axiosInstance.interceptors.request.use(
  config => {
    if (!axiosInstance.defaults.headers.common.Authorization) {
      return Promise.reject(new Error('Token not set. Please set the token before making requests.'))
    }
    return config
  },
  async error => {
    return await Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    return await Promise.reject(error)
  },
)

export { axiosInstance }
