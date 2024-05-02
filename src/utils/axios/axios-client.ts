import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from '../libs/axios/client'

export type ParamsClientType = AxiosRequestConfig['params']

type AxiosClientProps = Omit<AxiosRequestConfig, 'params'> & {
  params?: ParamsClientType
}

export async function axiosClient({
  method,
  url,
  params,
  responseType = 'json',
  ...restConfig
}: AxiosClientProps): Promise<AxiosResponse<any>> {
  if (!axiosInstance.defaults.headers.common.Authorization) {
    throw new Error('Token not set. Please set the token before making requests.')
  }

  const response = await axiosInstance({
    method,
    url,
    params,
    responseType,
    ...restConfig,
  })

  return response
}
