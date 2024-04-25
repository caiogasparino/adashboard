import { AxiosRequestConfig, AxiosResponse } from 'axios'
import useAuthentication from '../../hooks/useAuthentication'
import axiosInstance from '../libs/axios/client'

export type ParamsClientType = AxiosRequestConfig['params']

type AxiosClientProps = Omit<AxiosRequestConfig, 'params'> & {
  params?: ParamsClientType
}

export async function axiosClient({
  method = 'get',
  url,
  params,
  headers,
  responseType = 'json',
  ...restConfig
}: AxiosClientProps): Promise<AxiosResponse<any>> {
  if (!method) {
    method = 'get'
  }
  const { accessToken: token } = useAuthentication()

  const accessToken = headers?.Authorization?.split('Bearer ')[1] || token || ''

  const authHeaders = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {}

  const response = await axiosInstance({
    method,
    url,
    params,
    headers: {
      ...authHeaders,
      ...(headers || {}),
    },
    responseType,
    ...restConfig,
  })

  return response
}
