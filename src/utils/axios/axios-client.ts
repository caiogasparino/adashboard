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
  const response = await axiosInstance({
    method,
    url,
    params,
    responseType,
    ...restConfig,
  })

  return response
}
