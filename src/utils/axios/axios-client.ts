import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from '../libs/axios/client'

export type ParamsClientType = AxiosRequestConfig['params']

type AxiosClientProps = Omit<AxiosRequestConfig, 'params'> & {
  params?: ParamsClientType
}

export async function axiosClient({
  method = 'get',
  url,
  params,
  responseType = 'json',
  ...restConfig
}: AxiosClientProps): Promise<AxiosResponse<any>> {
  if (!method) {
    method = 'get'
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
